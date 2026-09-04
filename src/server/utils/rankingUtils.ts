/**
 * Phase 1
 *
 *  engine/effect  EffectConfig
 * /
 *  v2  engine/creation-v2/persistence/ScoreCalculator  product.score
 */

import { Quality } from '@shared/types/constants';
import { Artifact, Consumable } from '@shared/types/cultivator';
import { calculatePillScore } from '@shared/lib/pillScore';

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

export function calculateSingleArtifactScore(artifact: Artifact): number {
  if (typeof artifact.score === 'number') {
    return artifact.score;
  }
  const base = QUALITY_SCORE_MAP[artifact.quality || '凡品'] || 80;
  return Math.floor(Math.max(1, base));
}

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
