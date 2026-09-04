import { db } from '@server/lib/drizzle/db';
import { cultivators, sectMemberships } from '@server/lib/drizzle/schema';
import { SECT_DISCIPLE_RANKS, SECT_RANK_LABELS } from '@shared/engine/sect';
import { productionSectRuntime } from '@shared/engine/sect/content';
import { getBodyCultivationRankingTag } from '@shared/lib/bodyCultivation/ranking';
import { REALM_VALUES, type RealmType } from '@shared/types/constants';
import type { BattleRankingItem } from '@shared/types/rankings';
import type { Lock } from '@microfleet/ioredis-lock';
import type { CultivatorCondition } from '@shared/types/condition';
import { and, eq, inArray } from 'drizzle-orm';
import { redis } from './index';
import { createRedisLock, releaseRedisLock } from './lock';

const RANKING_LIST_PREFIX = 'golden_rank:list:';
const LEGACY_RANKING_LIST_KEY = 'golden_rank:list';
const DAILY_CHALLENGES_PREFIX = 'golden_rank:daily_challenges:';
const CHALLENGE_LOCK_PREFIX = 'golden_rank:challenge_lock:';
const LEGACY_CULTIVATOR_INFO_PREFIX = 'golden_rank:cultivator:'; 

const MAX_RANKING_SIZE = 100;
const LOCK_DURATION = 300; // 5
const MAX_DAILY_CHALLENGES = 10;

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
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getRankingListKey(realm: RealmType): string {
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

async function compactRankingScores(realm: RealmType): Promise<void> {
  const rankingKey = getRankingListKey(realm);
  const members = (await redis.zrange(
    rankingKey,
    0,
    String(MAX_RANKING_SIZE - 1),
  )) as string[];

  if (members.length === 0) return;

  const pipeline = redis.pipeline();
  members.forEach((cultivatorId, index) => {
    pipeline.zadd(rankingKey, index + 1, cultivatorId);
  });
  await pipeline.exec();
  await redis.zremrangebyrank(rankingKey, MAX_RANKING_SIZE, -1);
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
  const staleIds: string[] = [];

  for (const entry of order) {
    const record = map.get(entry.cultivatorId);
    if (!record || record.realm !== realm) {
      staleIds.push(entry.cultivatorId);
      continue;
    }

    validRecords.push(record);
  }

  const rankingKey = getRankingListKey(realm);
  const pipeline = redis.pipeline();
  for (const cultivatorId of staleIds) {
    pipeline.zrem(rankingKey, cultivatorId);
  }
  validRecords.forEach((record, index) => {
    pipeline.zadd(rankingKey, index + 1, record.id);
  });
  if (staleIds.length > 0 || validRecords.length > 0) {
    await pipeline.exec();
    await redis.zremrangebyrank(rankingKey, MAX_RANKING_SIZE, -1);
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
      bodyCultivation: getBodyCultivationRankingTag(record.condition ?? undefined),
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


export async function addToRanking(
  realm: RealmType,
  cultivatorId: string,
  _userId: string,
  targetRank?: number,
): Promise<void> {
  // score
  
  if (targetRank) {
    await adjustRankingsAfterInsert(realm, targetRank);
    await redis.zadd(getRankingListKey(realm), targetRank, cultivatorId);
  } else {
    const currentSize = await redis.zcard(getRankingListKey(realm));
    const rank = currentSize + 1;
    await redis.zadd(getRankingListKey(realm), rank, cultivatorId);
  }

  // 100
  // Upstash Redis: zremrangebyrank(key, start, stop)
  await redis.zremrangebyrank(getRankingListKey(realm), MAX_RANKING_SIZE, -1);
}

/**
 *
 * @returns  null
 */
export async function addToRankingTailIfVacant(
  realm: RealmType,
  cultivatorId: string,
): Promise<number | null> {
  const existingRank = await getCultivatorRank(realm, cultivatorId);
  if (existingRank !== null) return existingRank;

  const rankingKey = getRankingListKey(realm);
  const currentSize = await redis.zcard(rankingKey);
  if (currentSize >= MAX_RANKING_SIZE) return null;

  await redis.zadd(rankingKey, currentSize + 1, cultivatorId);
  await redis.zremrangebyrank(rankingKey, MAX_RANKING_SIZE, -1);

  const actualRank = await getCultivatorRank(realm, cultivatorId);
  if (actualRank === null || actualRank > MAX_RANKING_SIZE) return null;

  return actualRank;
}

/**
 * targetRank+1
 */
async function adjustRankingsAfterInsert(
  realm: RealmType,
  targetRank: number,
): Promise<void> {
  // targetRank0-basedtargetRank-1
  const rankingKey = getRankingListKey(realm);
  const members = (await redis.zrange(
    rankingKey,
    targetRank - 1,
    '-1',
  )) as string[];

  if (members.length === 0) {
    return; 
  }

  // Upstash Redis  pipeline  multi
  const pipeline = redis.pipeline();
  for (let i = 0; i < members.length; i++) {
    const cultivatorId = members[i];
    const newRank = targetRank + i + 1; // +1
    pipeline.zadd(rankingKey, newRank, cultivatorId);
  }
  await pipeline.exec();
}


export async function updateRanking(
  realm: RealmType,
  challengerId: string,
  targetId: string,
): Promise<void> {
  const rankingKey = getRankingListKey(realm);
  
  const targetRank = await redis.zrank(rankingKey, targetId);
  if (targetRank === null) {
    throw new Error('被挑战者不在排行榜上');
  }
  const targetRank1Based = targetRank + 1;

  // null
  const challengerRank = await redis.zrank(rankingKey, challengerId);

  //  pipeline
  const pipeline = redis.pipeline();

  if (challengerRank === null) {
    
    pipeline.zadd(rankingKey, targetRank1Based, challengerId);
    // +1
    // zrange  start  0-based  targetRank
    
    const members = (await redis.zrange(
      rankingKey,
      targetRank,
      '-1',
    )) as string[];
    for (let i = 0; i < members.length; i++) {
      const id = members[i];
      if (id !== challengerId) {
        pipeline.zadd(rankingKey, targetRank1Based + i + 1, id);
      }
    }
  } else {
    const challengerRank1Based = challengerRank + 1;
    
    if (challengerRank1Based <= targetRank1Based) {
      throw new Error('只能挑战排名比自己高的角色');
    }

    
    //  targetRank0-based
    const members = (await redis.zrange(
      rankingKey,
      targetRank,
      '-1',
    )) as string[];

    
    
    let rankOffset = 1; 
    for (let i = 0; i < members.length; i++) {
      const id = members[i];
      if (id === challengerId) continue; 

      //  +
      const newRank = targetRank1Based + rankOffset;
      pipeline.zadd(rankingKey, newRank, id);
      rankOffset++; 
    }

    
    pipeline.zadd(rankingKey, targetRank1Based, challengerId);
  }

  await pipeline.exec();

  
  await redis.zremrangebyrank(rankingKey, MAX_RANKING_SIZE, -1);
}

/**
 *
 * @returns
 */
export async function checkDailyChallenges(
  cultivatorId: string,
): Promise<{ success: boolean; remaining: number }> {
  const today = getTodayString();
  const key = `${DAILY_CHALLENGES_PREFIX}${cultivatorId}:${today}`;

  const current = await redis.get(key);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= MAX_DAILY_CHALLENGES) {
    return { success: false, remaining: 0 };
  }

  return { success: true, remaining: MAX_DAILY_CHALLENGES - count };
}


export async function incrementDailyChallenges(
  cultivatorId: string,
): Promise<number> {
  const today = getTodayString();
  const key = `${DAILY_CHALLENGES_PREFIX}${cultivatorId}:${today}`;

  const current = await redis.get(key);
  const count = current ? parseInt(current, 10) : 0;

  
  const newCount = count + 1;
  const ttl = getSecondsUntilMidnight();
  await redis.set(key, newCount.toString(), 'EX', ttl);

  return MAX_DAILY_CHALLENGES - newCount;
}


export async function getRemainingChallenges(
  cultivatorId: string,
): Promise<number> {
  const today = getTodayString();
  const key = `${DAILY_CHALLENGES_PREFIX}${cultivatorId}:${today}`;

  const current = await redis.get(key);
  const count = current ? parseInt(current, 10) : 0;

  return Math.max(0, MAX_DAILY_CHALLENGES - count);
}

/**
 *
 * @returns
 */
export async function acquireChallengeLock(
  cultivatorId: string,
): Promise<Lock | null> {
  const lockKey = `${CHALLENGE_LOCK_PREFIX}${cultivatorId}`;
  const lock = createRedisLock({
    timeout: LOCK_DURATION * 1000,
    retries: 0,
  });
  try {
    await lock.acquire(lockKey);
    return lock;
  } catch {
    return null;
  }
}


export async function releaseChallengeLock(
  lock: Lock | null,
): Promise<void> {
  await releaseRedisLock(lock, 'ranking-challenge');
}


export async function isLocked(cultivatorId: string): Promise<boolean> {
  const lockKey = `${CHALLENGE_LOCK_PREFIX}${cultivatorId}`;
  // Upstash Redis: exists(key)  number (0  1)
  const exists = await redis.exists(lockKey);
  return exists > 0;
}


export async function removeFromRanking(
  realm: RealmType,
  cultivatorId: string,
): Promise<void> {
  await redis.zrem(getRankingListKey(realm), cultivatorId);
  await compactRankingScores(realm);
  
  const infoKey = `${LEGACY_CULTIVATOR_INFO_PREFIX}${cultivatorId}`;
  await redis.del(infoKey);
}

export async function removeFromAllRankingRealmsExcept(
  cultivatorId: string,
  currentRealm: RealmType,
): Promise<void> {
  const pipeline = redis.pipeline();
  const removedRealms: RealmType[] = [];
  for (const realm of REALM_VALUES) {
    if (realm === currentRealm) continue;
    pipeline.zrem(getRankingListKey(realm), cultivatorId);
    removedRealms.push(realm);
  }
  pipeline.zrem(LEGACY_RANKING_LIST_KEY, cultivatorId);
  pipeline.del(`${LEGACY_CULTIVATOR_INFO_PREFIX}${cultivatorId}`);
  await pipeline.exec();
  await Promise.all(removedRealms.map((realm) => compactRankingScores(realm)));
}


export async function isRankingEmpty(realm: RealmType): Promise<boolean> {
  const count = await redis.zcard(getRankingListKey(realm));
  return count === 0;
}

/**
 * TTL
 */
function getSecondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.ceil((midnight.getTime() - now.getTime()) / 1000);
}
