/**
 * Phase 1
 *
 *  engine/effect  EffectConfig
 * /
 *
 */

import { calculatePillScore } from '@shared/lib/pillScore';
import { Quality } from '@shared/types/constants';
import { Consumable } from '@shared/types/cultivator';

const QUALITY_SCORE_MAP: Record<Quality, number> = {
  凡品: 80,
  灵品: 180,
  玄品: 360,
  真品: 700,
  地品: 1300,
  天品: 2400,
  仙品: 4300,
  神品: 7600,
};

export function calculateSingleElixirScore(consumable: Consumable): number {
  const pillScore = calculatePillScore(consumable);
  if (pillScore !== null) {
    return pillScore;
  }

  if (
    typeof consumable.score === 'number' &&
    Number.isFinite(consumable.score) &&
    consumable.score > 0
  ) {
    return Math.round(consumable.score);
  }
  const base = QUALITY_SCORE_MAP[consumable.quality || '凡品'] || 80;
  return Math.floor(Math.max(1, base * 0.72));
}
