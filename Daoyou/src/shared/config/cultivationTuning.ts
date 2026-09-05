import type { Quality } from '@shared/types/constants';

/**
 * ============================================================
 *   ·
 * ============================================================
 *
 *
 *
 *
 *
 *     =  ×  ×  ×
 *          ×  ×
 *     ×1.5 20~50
 *
 *     0~MAX_NORMAL_INSIGHT
 * ============================================================
 */

// ──────────────────────────────────────────────
//  1.
// ──────────────────────────────────────────────

/** BASE +  / 100 */
export const SPIRITUAL_ROOT_BASE = 0.5;


export const DEFAULT_SPIRITUAL_ROOT_STRENGTH = 50;

// ──────────────────────────────────────────────
//  2.
// ──────────────────────────────────────────────


export const TECHNIQUE_QUALITY_MULTIPLIERS: Record<Quality, number> = {
  凡品: 0.8,
  灵品: 0.85,
  玄品: 0.9,
  真品: 0.95,
  地品: 1.0,
  天品: 1.05,
  仙品: 1.1,
  神品: 1.15,
};


export const NO_TECHNIQUE_MULTIPLIER = 1.0;


export const TECHNIQUE_MIN_MULTIPLIER = 0.8;


export const TECHNIQUE_FALLBACK_QUALITY: Quality = '凡品';

// ──────────────────────────────────────────────
//  3.
// ──────────────────────────────────────────────

/**
 * BASE + SCALE × √(log₁₀(years + 1))
 *
 * <1.0
 *
 *
 * BASE=0.88, SCALE=0.20
 *   1  → 0.99    10  → 1.08
 *   50  → 1.14   100  → 1.16   200  → 1.18
 *   500  → 1.22  1000  → 1.24  5000  → 1.27
 */
export const YEARS_MULTIPLIER_BASE = 0.88;
export const YEARS_MULTIPLIER_SCALE = 0.20;

// ──────────────────────────────────────────────
//  4.
// ──────────────────────────────────────────────

/**
 *
 *  = RANDOM_FACTOR_LOW + rng() × RANDOM_FACTOR_RANGE
 * 0.8 ~ 1.1 ±15%
 */
export const RANDOM_FACTOR_LOW = 0.8;
export const RANDOM_FACTOR_RANGE = 0.3;

// ──────────────────────────────────────────────
//  5.
// ──────────────────────────────────────────────


export const EPIPHANY_CHANCE = 0.05;

/** 1.5  */
export const EPIPHANY_EXP_MULTIPLIER = 1.5;


export const EPIPHANY_INSIGHT_MIN = 20;

/**
 *
 *  = EPIPHANY_INSIGHT_MIN + floor(rng × EPIPHANY_INSIGHT_RANGE)
 * 20 + [0, 30] = 20~50
 */
export const EPIPHANY_INSIGHT_RANGE = 31;

// ──────────────────────────────────────────────
//  6.
// ──────────────────────────────────────────────


export const MAX_NORMAL_INSIGHT = 40;

/**
 *
 * min(MAX, floor(√years × SCALE × rng))
 */
export const NORMAL_INSIGHT_SCALE = 1.8;

// ──────────────────────────────────────────────
//  7.
// ──────────────────────────────────────────────


export const BOTTLENECK_THRESHOLD = 70;


export const BOTTLENECK_EXP_PENALTY = 0.5;

// ──────────────────────────────────────────────
//  8.
// ──────────────────────────────────────────────


export const BREAKTHROUGH_MIN_PROGRESS = 60;


export const NORMAL_BREAKTHROUGH_THRESHOLD = 80;


export const PERFECT_BREAKTHROUGH_INSIGHT = 50;

// ──────────────────────────────────────────────
//  9.
// ──────────────────────────────────────────────

/**
 *
 * baseLow / baseRange baseLow + rng × baseRange
 * insightDivisor  =  × (1 - insight / divisor)
 */
export const FAILURE_LOSS_PARAMS = {
  forced:  { baseLow: 0.5, baseRange: 0.2, insightDivisor: 500 },
  normal:  { baseLow: 0.3, baseRange: 0.2, insightDivisor: 300 },
  perfect: { baseLow: 0.2, baseRange: 0.1, insightDivisor: 200 },
} as const;
