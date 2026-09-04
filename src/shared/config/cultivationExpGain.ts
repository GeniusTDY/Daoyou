import type { RealmStage, RealmType } from '@shared/types/constants';

/**
 *
 *
 *
 *  cap
 *    = REALM_TARGET_DAYS[realm] × REALM_DAILY_EXP_BUDGET[realm]
 *
 *
 * - /
 * -  EXP_CAP_TABLE
 */
export const REALM_TARGET_DAYS = {
  炼气: 3,
  筑基: 7,
  金丹: 21,
  元婴: 42,
  化神: 70,
  炼虚: 98,
  合体: 126,
  大乘: 154,
  渡劫: 182,
} satisfies Record<RealmType, number>;

/**
 *
 *
 *
 *
 *
 *
 *    = floor(
 *     REALM_DAILY_EXP_BUDGET[realm]
 *     × sourceDailyFraction
 *     × units
 *     × sourceMultiplier
 *   )
 *
 *
 * - “”/
 * -  EXP_BUDGET
 */
export const REALM_DAILY_EXP_BUDGET = {
  炼气: 1_000,
  筑基: 1_800,
  金丹: 3_200,
  元婴: 5_600,
  化神: 9_000,
  炼虚: 14_000,
  合体: 21_000,
  大乘: 30_000,
  渡劫: 42_000,
} satisfies Record<RealmType, number>;

/**
 *
 *
 * ///
 *  cap
 *    cap ≈ REALM_TARGET_DAYS[realm]
 *            × REALM_DAILY_EXP_BUDGET[realm]
 *            × STAGE_EXP_WEIGHT[stage]
 *
 *  cap cultivation_exp
 *  EXP_CAP_TABLE “”
 */
export const STAGE_EXP_WEIGHT = {
  初期: 0.15,
  中期: 0.2,
  后期: 0.25,
  圆满: 0.4,
} satisfies Record<RealmStage, number>;

/**
 *
 *
 *
 *    = dailyBudget × dailyFractionPerYear × min(years, maxYears)
 *
 * “”
 *    ×  ×  ×  ×  ×
 *
 *
 * - dailyFractionPerYear  1 “”
 * - maxYears
 */
export const RETREAT_EXP_BUDGET = {
  dailyFractionPerYear: 0.005,
  maxYears: 200,
  minBaseExp: 1,
} as const;

/**
 *
 *
 *
 *    = dailyBudget
 *            × dailyFractionPerUnit
 *            × min(hoursElapsed / hoursPerUnit, maxUnits)
 *            × randomFactor
 *
 *
 * -  1  1
 * - 24  24
 * - 24  = dailyBudget × 0.008 × 24 = 19.2%
 * -  0.8~1.2 24  15.36%~23.04%
 * - 24  24
 */
export const OFFLINE_YIELD_EXP_BUDGET = {
  dailyFractionPerUnit: 0.008,
  hoursPerUnit: 1,
  maxUnits: 24,
  minBaseExp: 1,
  randomFactor: {
    min: 0.8,
    range: 0.4,
  },
} as const;

/**
 *
 *
 *
 *    = dailyBudget
 *            × dailyFraction
 *            × realmDiffMultiplier
 *            × victoryMultiplier
 *
 *
 * - dailyFraction
 * - realmDiffMultiplier /
 * - victoryMultiplier
 */
export const BATTLE_VICTORY_EXP_BUDGET = {
  dailyFraction: 0.008,
  minBaseExp: 1,
  realmDiffMultiplier: {
    weaker: 0.25,
    same: 1,
    oneAbove: 1.4,
    twoOrMoreAbove: 1.8,
  },
  victoryMultiplier: {
    normal: 1,
    perfect: 1.15,
    challenged: 1.1,
  },
} as const;

/**
 *
 *
 *  tierDailyFraction
 *    = dailyBudget
 *            × tierDailyFraction[tier]
 *            × (1 + dangerBonus × dangerBonusScale)
 *            × dungeonDifficultyRewardBonus
 *
 *  dungeonDifficultyRewardBonus
 *   easy 1.0 / normal 1.1 / hard 1.2 / elite 1.3 / boss 1.5
 *
 *  helper  resultDailyFraction
 *   perfect -> S, good -> A, normal -> B, failed -> 2%
 *
 *
 * -  S/A/B/C/D  tierDailyFraction
 * -  dangerBonusScale
 * -  result
 */
export const DUNGEON_EXP_BUDGET = {
  minBaseExp: 1,
  tierDailyFraction: {
    S: 0.32,
    A: 0.22,
    B: 0.14,
    C: 0.08,
    D: 0.04,
  },
  resultDailyFraction: {
    perfect: 0.32,
    good: 0.22,
    normal: 0.14,
    failed: 0.02,
  },
  dangerBonusScale: 0.2,
} as const;

/**
 *
 *
 *
 *    = dailyBudget × difficultyDailyFraction[difficulty]
 *
 *
 * - easy/normal
 * - hard/elite
 */
export const DAILY_TASK_EXP_BUDGET = {
  minBaseExp: 1,
  difficultyDailyFraction: {
    easy: 0.05,
    normal: 0.08,
    hard: 0.12,
    elite: 0.18,
  },
} as const;

/**
 *
 *
 *
 *    = dailyBudget
 *            × dailyFractionByWeight[weight]
 *            × multiplier
 *
 *
 * - minor/normal/major
 * - multiplier
 */
export const EVENT_EXP_BUDGET = {
  minBaseExp: 1,
  dailyFractionByWeight: {
    minor: 0.05,
    normal: 0.1,
    major: 0.25,
  },
} as const;

/**
 *
 *
 *
 *    = min(
 *     dailyBudget × dailyFractionByWeight[weight] × multiplier,
 *     dailyBudget × maxDailyFraction
 *   )
 *
 *
 *  maxDailyFraction
 */
export const SYSTEM_REWARD_EXP_BUDGET = {
  minBaseExp: 1,
  maxDailyFraction: 0.8,
  dailyFractionByWeight: {
    minor: 0.05,
    normal: 0.1,
    major: 0.25,
  },
} as const;
