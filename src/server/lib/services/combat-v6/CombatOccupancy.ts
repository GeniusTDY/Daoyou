import { hasDungeonBattle } from '@server/lib/dungeon/occupancy';
import { db, type DbExecutor } from '@server/lib/drizzle/db';
import { redis } from '@server/lib/redis';
import { hasActiveRanking } from '@server/lib/redis/rankingChallenge';
import { hasTowerBattle } from '@server/lib/tower/occupancy';
import { arenaOccupancyKey } from './CombatV6ArenaStore';
import { hasActiveBreakthroughBattle } from './CombatV6BreakthroughOccupancy';
import { CombatV6RuntimeStore } from './CombatV6RuntimeStore';
import { hasActiveSectTaskBattle } from './CombatV6SectTaskOccupancy';
import { CombatV6WildStore } from './CombatV6WildStore';


export async function hasActiveCombat(
  owner: string,
  options: { executor?: DbExecutor; includeDungeon?: boolean } = {},
) {
  const includeDungeon = options.includeDungeon !== false;
  const [
    towerBattle,
    dungeonBattle,
    ranking,
    sectBattle,
    breakthroughBattle,
    wildLock,
    arena,
    runtimeId,
  ] = await Promise.all([
    hasTowerBattle(owner),
    includeDungeon
      ? hasDungeonBattle(owner, options.executor ?? db)
      : Promise.resolve(false),
    hasActiveRanking(owner),
    hasActiveSectTaskBattle(owner),
    hasActiveBreakthroughBattle(owner),
    new CombatV6WildStore().lock(owner),
    redis.get(arenaOccupancyKey(owner)),
    new CombatV6RuntimeStore().currentId(owner),
  ]);
  return !!(
    towerBattle ||
    dungeonBattle ||
    ranking ||
    sectBattle ||
    breakthroughBattle ||
    wildLock ||
    arena ||
    runtimeId
  );
}
