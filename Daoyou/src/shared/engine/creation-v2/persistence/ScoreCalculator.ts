import type { BalanceMetrics } from '../balancing/PBU';
import type { AffixRarity, RolledAffix } from '../types';

/**
 *
 * base(PBU×10) + (+50) +
 */
const RARITY_SCORE: Record<AffixRarity, number> = {
  common: 0,
  uncommon: 10,
  rare: 30,
  legendary: 60,
};

export function calculateProductScore(
  metrics: BalanceMetrics | undefined,
  affixes: RolledAffix[],
): number {
  const pbuBase = Math.round((metrics?.pbu ?? 0) * 10);

  let perfectBonus = 0;
  let rarityBonus = 0;
  for (const affix of affixes) {
    if (affix.isPerfect) perfectBonus += 50;
    rarityBonus += RARITY_SCORE[affix.rarity] ?? 0;
  }

  return pbuBase + perfectBonus + rarityBonus;
}
