/**
 *
 *
 *  Redis key dungeon:daily:{cultivatorId}:{YYYY-MM-DD}
 *  24
 */

import { redis } from '../redis';

const DAILY_DUNGEON_LIMIT = 2;
const KEY_TTL_SECONDS = 86400; // 24
const RESET_TIMEZONE = 'Asia/Shanghai';

function getDateInResetTimezone(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: RESET_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/**
 *  Redis key
 */
function getDailyLimitKey(cultivatorId: string): string {
  const today = getDateInResetTimezone(); // YYYY-MM-DD
  return `dungeon:daily:${cultivatorId}:${today}`;
}


export async function checkDungeonLimit(
  cultivatorId: string,
): Promise<{ allowed: boolean; remaining: number; used: number }> {
  const key = getDailyLimitKey(cultivatorId);
  const countStr = await redis.get(key);
  const parsed = countStr ? parseInt(String(countStr), 10) : 0;
  const used = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  const remaining = Math.max(0, DAILY_DUNGEON_LIMIT - used);

  return {
    allowed: used < DAILY_DUNGEON_LIMIT,
    remaining,
    used,
  };
}


export async function consumeDungeonLimit(cultivatorId: string): Promise<void> {
  const key = getDailyLimitKey(cultivatorId);
  const used = await redis.incr(key);
  if (used === 1) {
    await redis.expire(key, KEY_TTL_SECONDS);
  }

  if (used > DAILY_DUNGEON_LIMIT) {
    
    await redis.decr(key);
    throw new Error('今日探索次数已用尽（每日限 2 次）');
  }
}


export function getDungeonLimitConfig() {
  return {
    dailyLimit: DAILY_DUNGEON_LIMIT,
  };
}
