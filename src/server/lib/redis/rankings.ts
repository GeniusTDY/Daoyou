import { db } from '@server/lib/drizzle/db';
import { cultivators, sectMemberships } from '@server/lib/drizzle/schema';
import {
  MAX_DAILY_RANKING_CHALLENGES,
  rankingDay,
} from '@shared/combat-v6/ranking';
import { SECT_DISCIPLE_RANKS, SECT_RANK_LABELS } from '@shared/engine/sect';
import { productionSectRuntime } from '@shared/engine/sect/content';
import { getBodyCultivationRankingTag } from '@shared/lib/bodyCultivation/ranking';
import type { CultivatorCondition } from '@shared/types/condition';
import { REALM_VALUES, type RealmType } from '@shared/types/constants';
import type { BattleRankingItem } from '@shared/types/rankings';
import { and, eq, inArray } from 'drizzle-orm';
import { redis } from './index';
import { rankingQuotaKey } from './rankingChallenge';

const RANKING_LIST_PREFIX = 'golden_rank:list:';
const LEGACY_RANKING_LIST_KEY = 'golden_rank:list';
const LEGACY_CULTIVATOR_INFO_PREFIX = 'golden_rank:cultivator:'; 

const MAX_RANKING_SIZE = 100;

export type RankingItem = BattleRankingItem;

interface RankingCultivatorProjection {
  id: string;
  name: string;
  title: string | null;
  age: number;
  realm: string;
  realmStage: string;
  origin: string | null;
  condition: CultivatorCondition | null;
  sectId: string | null;
  discipleRank: string | null;
}

export interface CultivatorRankInfo {
  rank: number | null; // null
  remainingChallenges: number;
}

/**
 *  (YYYY-MM-DD)
 */
function getTodayString(): string {
  return rankingDay(Date.now());
}

export function getRankingListKey(realm: RealmType): string {
  return `${RANKING_LIST_PREFIX}${realm}`;
}

function getSectAffiliation(
  record: Pick<RankingCultivatorProjection, 'sectId' | 'discipleRank'>,
): string {
  if (!record.sectId) return '散修';

  const sectName =
    productionSectRuntime.registry.get(record.sectId)?.definition.name ??
    '未知宗门';
  const discipleRank = SECT_DISCIPLE_RANKS.find(
    (rank) => rank === record.discipleRank,
  );
  const rankLabel = discipleRank ? SECT_RANK_LABELS[discipleRank] : '宗门弟子';

  return `${sectName} · ${rankLabel}`;
}


async function getRankingOrder(
  realm: RealmType,
): Promise<{ cultivatorId: string; rank: number }[]> {
  const members = await redis.zrange(
    getRankingListKey(realm),
    0,
    String(MAX_RANKING_SIZE - 1),
  );

  return members.map((cultivatorId, index) => ({
    cultivatorId: cultivatorId as string,
    rank: index + 1,
  }));
}

async function getHydratedRankingOrder(
  realm: RealmType,
): Promise<Array<{ record: RankingCultivatorProjection; rank: number }>> {
  const order = await getRankingOrder(realm);
  const ids = order.map((item) => item.cultivatorId);
  if (ids.length === 0) return [];
  const rows = await db
    .select({
      id: cultivators.id,
      name: cultivators.name,
      title: cultivators.title,
      age: cultivators.age,
      realm: cultivators.realm,
      realmStage: cultivators.realm_stage,
      origin: cultivators.origin,
      condition: cultivators.condition,
      sectId: sectMemberships.sectId,
      discipleRank: sectMemberships.discipleRank,
    })
    .from(cultivators)
    .leftJoin(
      sectMemberships,
      and(
        eq(sectMemberships.cultivatorId, cultivators.id),
        eq(sectMemberships.status, 'active'),
      ),
    )
    .where(and(inArray(cultivators.id, ids), eq(cultivators.status, 'active')));
  const projections: RankingCultivatorProjection[] = rows.map((row) => ({
    ...row,
    condition:
      (row.condition as CultivatorCondition | null | undefined) ?? null,
  }));
  const map = new Map(projections.map((item) => [item.id, item]));
  const validRecords: RankingCultivatorProjection[] = [];

  for (const entry of order) {
    const record = map.get(entry.cultivatorId);
    if (!record || record.realm !== realm) {
      continue;
    }

    validRecords.push(record);
  }

  return validRecords.map((record, index) => ({
    record,
    rank: index + 1,
  }));
}

/**
 *  N  ID
 */
export async function getTopRankingCultivatorIds(
  realm: RealmType,
  limit = MAX_RANKING_SIZE,
): Promise<string[]> {
  const safeLimit = Math.max(0, Math.min(limit, MAX_RANKING_SIZE));
  if (safeLimit === 0) return [];
  const order = await getHydratedRankingOrder(realm);
  return order.slice(0, safeLimit).map((entry) => entry.record.id);
}


export async function getRankingList(realm: RealmType): Promise<RankingItem[]> {
  const order = await getHydratedRankingOrder(realm);

  const items: RankingItem[] = [];
  for (const entry of order) {
    const record = entry.record;

    items.push({
      id: record.id,
      rank: entry.rank,
      name: record.name,
      title: record.title,
      age: record.age,
      realm: record.realm,
      realm_stage: record.realmStage,
      origin: record.origin,
      sectAffiliation: getSectAffiliation(record),
      bodyCultivation: getBodyCultivationRankingTag(
        record.condition ?? undefined,
      ),
    });
  }

  return items;
}


export async function getCultivatorRank(
  realm: RealmType,
  cultivatorId: string,
): Promise<number | null> {
  const order = await getHydratedRankingOrder(realm);
  const index = order.findIndex((entry) => entry.record.id === cultivatorId);
  return index >= 0 ? index + 1 : null;
}

export async function getRemainingChallenges(
  cultivatorId: string,
  day = getTodayString(),
): Promise<number> {
  return Math.max(
    0,
    MAX_DAILY_RANKING_CHALLENGES -
      (await redis.hlen(rankingQuotaKey(cultivatorId, day))),
  );
}


export async function removeFromRanking(
  realm: RealmType,
  cultivatorId: string,
): Promise<void> {
  await redis.zrem(getRankingListKey(realm), cultivatorId);
  
  const infoKey = `${LEGACY_CULTIVATOR_INFO_PREFIX}${cultivatorId}`;
  await redis.del(infoKey);
}

export async function removeFromAllRankingRealmsExcept(
  cultivatorId: string,
  currentRealm: RealmType,
): Promise<void> {
  const pipeline = redis.pipeline();
  for (const realm of REALM_VALUES) {
    if (realm === currentRealm) continue;
    pipeline.zrem(getRankingListKey(realm), cultivatorId);
  }
  pipeline.zrem(LEGACY_RANKING_LIST_KEY, cultivatorId);
  pipeline.del(`${LEGACY_CULTIVATOR_INFO_PREFIX}${cultivatorId}`);
  await pipeline.exec();
}
