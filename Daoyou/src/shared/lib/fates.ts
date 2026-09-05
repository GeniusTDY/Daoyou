import type {
  FateEffectEntry,
  PreHeavenFate,
} from '@shared/types/cultivator';

/**
 *
 *
 * “/” reduction
 * - reduction = 0.25  25%
 * - reduction = -0.05  5%
 *
 * reduction
 *  multiplier 1
 */
export interface FateContext {
  retreatExpMultiplier: number;
  retreatInsightMultiplier: number;
  breakthroughChanceBonus: number;
  naturalRecoveryMultiplier: number;
  toxicityPenaltyMultiplier: number;
  toxicityPenaltyReduction: number;
  alchemySpiritStoneMultiplier: number;
  alchemySpiritStoneReduction: number;
  refineSpiritStoneMultiplier: number;
  refineSpiritStoneReduction: number;
  enlightenmentInsightMultiplier: number;
  enlightenmentInsightReduction: number;
  innCultivationLossMultiplier: number;
  innCultivationLossReduction: number;
  systemSpiritStoneMultiplier: number;
  systemSpiritStoneReduction: number;
  marketPurchasePriceMultiplier: number;
  marketPurchasePriceReduction: number;
  summary: string;
}

function clampNonNegativeMultiplier(reduction: number): number {
  return Math.max(0, 1 - reduction);
}

function summarizeEffects(effects: FateEffectEntry[]): string {
  return effects.map((effect) => effect.label).join('、');
}

export function normalizeFate(fate: PreHeavenFate): PreHeavenFate {
  return {
    ...fate,
    effects: fate.effects ?? [],
  };
}

export function normalizeFates(fates: PreHeavenFate[]): PreHeavenFate[] {
  return fates.map(normalizeFate);
}

export function evaluateFateContext(fates: PreHeavenFate[]): FateContext {
  const normalized = normalizeFates(fates);
  let retreatExpMultiplier = 1;
  let retreatInsightMultiplier = 1;
  let breakthroughChanceBonus = 0;
  let naturalRecoveryMultiplier = 1;
  let toxicityPenaltyReduction = 0;
  let alchemySpiritStoneReduction = 0;
  let refineSpiritStoneReduction = 0;
  let enlightenmentInsightReduction = 0;
  let innCultivationLossReduction = 0;
  let systemSpiritStoneReduction = 0;
  let marketPurchasePriceReduction = 0;

  for (const fate of normalized) {
    for (const effect of fate.effects ?? []) {
      switch (effect.effectType) {
        case 'retreat_exp_multiplier':
          retreatExpMultiplier *= effect.value;
          break;
        case 'retreat_insight_multiplier':
          retreatInsightMultiplier *= effect.value;
          break;
        case 'breakthrough_bonus':
          breakthroughChanceBonus += effect.value;
          break;
        case 'natural_recovery_multiplier':
          naturalRecoveryMultiplier *= effect.value;
          break;
        case 'toxicity_penalty_multiplier':
          toxicityPenaltyReduction += 1 - effect.value;
          break;
        case 'alchemy_spirit_stone_multiplier':
          alchemySpiritStoneReduction += 1 - effect.value;
          break;
        case 'refine_spirit_stone_multiplier':
          refineSpiritStoneReduction += 1 - effect.value;
          break;
        case 'enlightenment_insight_multiplier':
          enlightenmentInsightReduction += 1 - effect.value;
          break;
        case 'inn_cultivation_loss_multiplier':
          innCultivationLossReduction += 1 - effect.value;
          break;
        case 'system_spirit_stone_multiplier':
          systemSpiritStoneReduction += 1 - effect.value;
          break;
        case 'market_purchase_price_multiplier':
          marketPurchasePriceReduction += 1 - effect.value;
          break;
      }
    }
  }

  return {
    retreatExpMultiplier,
    retreatInsightMultiplier,
    breakthroughChanceBonus,
    naturalRecoveryMultiplier,
    toxicityPenaltyReduction,
    toxicityPenaltyMultiplier: clampNonNegativeMultiplier(
      toxicityPenaltyReduction,
    ),
    alchemySpiritStoneReduction,
    alchemySpiritStoneMultiplier: clampNonNegativeMultiplier(
      alchemySpiritStoneReduction,
    ),
    refineSpiritStoneReduction,
    refineSpiritStoneMultiplier: clampNonNegativeMultiplier(
      refineSpiritStoneReduction,
    ),
    enlightenmentInsightReduction,
    enlightenmentInsightMultiplier: clampNonNegativeMultiplier(
      enlightenmentInsightReduction,
    ),
    innCultivationLossReduction,
    innCultivationLossMultiplier: clampNonNegativeMultiplier(
      innCultivationLossReduction,
    ),
    systemSpiritStoneReduction,
    systemSpiritStoneMultiplier: clampNonNegativeMultiplier(
      systemSpiritStoneReduction,
    ),
    marketPurchasePriceReduction,
    marketPurchasePriceMultiplier: clampNonNegativeMultiplier(
      marketPurchasePriceReduction,
    ),
    summary: normalized
      .map((fate) => {
        const summary = summarizeEffects(fate.effects ?? []);
        return summary ? `${fate.name}：${summary}` : fate.name;
      })
      .join(' | '),
  };
}

export function getAlchemySpiritStoneMultiplier(context: FateContext): number {
  return clampNonNegativeMultiplier(
    context.alchemySpiritStoneReduction + context.systemSpiritStoneReduction,
  );
}

export function getRefineSpiritStoneMultiplier(context: FateContext): number {
  return clampNonNegativeMultiplier(
    context.refineSpiritStoneReduction + context.systemSpiritStoneReduction,
  );
}

export function getInnSpiritStoneMultiplier(context: FateContext): number {
  return clampNonNegativeMultiplier(context.systemSpiritStoneReduction);
}

export function getMarketPurchasePriceMultiplier(
  context: FateContext,
): number {
  return clampNonNegativeMultiplier(context.marketPurchasePriceReduction);
}

export function scaleFateAdjustedValue(
  baseValue: number,
  multiplier: number,
): number {
  return Math.max(0, Math.round(Math.max(0, baseValue) * multiplier));
}

/**  1  */
export function scaleFateAdjustedCost(
  baseValue: number,
  multiplier: number,
): number {
  const normalizedBaseValue = Math.max(0, baseValue);
  if (normalizedBaseValue === 0) {
    return 0;
  }

  const adjustedValue = normalizedBaseValue * Math.max(0, multiplier);
  const roundedValue =
    multiplier < 1 ? Math.floor(adjustedValue) : Math.round(adjustedValue);

  return Math.max(1, roundedValue);
}
