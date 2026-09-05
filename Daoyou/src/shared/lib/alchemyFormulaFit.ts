import type { FormulaFitBand } from '@shared/types/consumable';

export interface FormulaFitPolicy {
  
  score: number;
  baseMultiplier: number;
  minMultiplier: number;
  maxMultiplier: number;
  stabilityPenalty: number;
  toxicityPenalty: number;
  masteryGain: number;
}

export const FORMULA_FIT_POLICIES: Record<FormulaFitBand, FormulaFitPolicy> = {
  aligned: {
    score: 1,
    baseMultiplier: 1.05,
    minMultiplier: 0.95,
    maxMultiplier: 1.15,
    stabilityPenalty: 0,
    toxicityPenalty: 0,
    masteryGain: 2,
  },
  degraded: {
    score: 0.55,
    baseMultiplier: 0.84,
    minMultiplier: 0.78,
    maxMultiplier: 0.9,
    stabilityPenalty: 8,
    toxicityPenalty: 8,
    masteryGain: 1,
  },
  poor: {
    score: 0.25,
    baseMultiplier: 0.5,
    minMultiplier: 0.35,
    maxMultiplier: 0.62,
    stabilityPenalty: 35,
    toxicityPenalty: 45,
    masteryGain: 0,
  },
};

export function getFormulaFitPolicy(fitBand: FormulaFitBand): FormulaFitPolicy {
  return FORMULA_FIT_POLICIES[fitBand];
}
