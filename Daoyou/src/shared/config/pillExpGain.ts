import type { Quality } from '@shared/types/constants';

/**
 *
 *
 *  daily budget /
 *
 *
 *
 *    = expCap
 *            × percentByQuality[quality]
 *            × fitMultiplier
 *
 *  qualityScalar
 *    = expCap
 *            × percentByQuality['']
 *            × qualityScalar
 *            × fitMultiplier
 *
 *
 * -
 * - /
 * -  REALM_DAILY_EXP_BUDGET
 */
export const PILL_EXP_BUDGET = {
  percentByQuality: {
    凡品: 0.002,
    灵品: 0.0035,
    玄品: 0.006,
    真品: 0.01,
    地品: 0.017,
    天品: 0.028,
    仙品: 0.045,
    神品: 0.07,
  } satisfies Record<Quality, number>,
  minBaseExp: 1,
} as const;
