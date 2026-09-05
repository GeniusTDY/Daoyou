import { AffixRarity, AffixSlot, CreationProductType } from '../types';
import { CREATION_EVENT_PRIORITY_LEVELS } from './CreationEventPriorities';
import { MAX_PLAYER_ITEM_QUANTITY } from '@shared/config/itemQuantity';
import type { Quality } from '@shared/types/constants';


export const CREATION_AFFIX_RARITY_UNLOCK_THRESHOLDS = {
  common: 0,
  uncommon: 25,
  rare: 80,
  legendary: 120,
} as const;

export function resolveUnlockedAffixRarities(
  effectiveTotal: number,
): AffixRarity[] {
  return (
    Object.entries(CREATION_AFFIX_RARITY_UNLOCK_THRESHOLDS) as [
      AffixRarity,
      number,
    ][]
  )
    .filter(([, threshold]) => effectiveTotal >= threshold)
    .map(([rarity]) => rarity);
}


export const CREATION_RESERVED_ENERGY: Record<CreationProductType, number> = {
  
  skill: 3,
  
  artifact: 2,
  
  gongfa: 2,
};


export const CREATION_INPUT_CONSTRAINTS = {
  
  minMaterialKinds: 1,
  
  maxMaterialKinds: 6,
  
  minQuantityPerMaterial: 1,
  
  maxQuantityPerMaterial: 3,
} as const;


export const ALCHEMY_MAX_DOSE = MAX_PLAYER_ITEM_QUANTITY;


export const CREATION_SKILL_DEFAULTS = {
  
  healCooldown: 3,
  
  damageCooldown: 2,
  
  buffCooldown: 3,
} as const;

/**
 * creation-v2
 *
 *
 * - control  2  3
 * -  buff / debuff  3-6
 * -
 */
export const CREATION_DURATION_POLICY = {
  control: {
    default: 2,
    elite: 3,
  },
  buffDebuff: {
    short: 3,
    standard: 4,
    long: 5,
    extended: 6,
    persistentException: -1,
  },
} as const;


export const CREATION_PASSIVE_DEFAULTS = {
  
  minArtifactShieldBase: 10,
  
  minGongFaHealBase: 8,
} as const;

/**
 *
 * “” energyValue
 */
export const CREATION_MATERIAL_ENERGY = {
  
  qualityWeights: [3, 5, 8, 13, 21, 34, 55, 89] as const,
  // gongfa_manual / skill_manual
  specializedManualBonus: 3,
  
  diversityBonusPerExtraType: 2,
  
  maxDiversityBonus: 8,
  
  coherenceBonusPerStack: 2,
  
  maxCoherenceBonus: 6,
};


export const CREATION_MANUAL_ALIGNMENT = {
  missingManualPenaltyByProduct: {
    skill: 3,
    gongfa: 3,
  } as Partial<Record<CreationProductType, number>>,
} as const;

/**
 * unlock score
 * unlock score
 */
export const CREATION_UNLOCK_SCORE_PROFILE = {
  
  materialContributionWeights: [1, 0.82, 0.64, 0.5, 0.38, 0.28] as const,
  //  unlock score
  diversityBonusMultiplier: 1,
  //  unlock score
  coherenceBonusMultiplier: 1,
} as const;


export const CREATION_AFFIX_POOL_SCORING = {
  //  admission score
  minimumScoreBySlot: {
    core: 0,
    identity: 0.45,
    resonance: 0.45,
    modifier: 0.45,
  } as const satisfies Record<AffixSlot, number>,

  //  tagSignalScores
  tagSignalWeights: {
    
    explicitMaterial: 0.25,
    
    recipeMaterial: 0.35,
    
    semanticMaterial: 0.55,
    
    matchedRecipe: 0.6,
    // Intent
    dominantIntent: 0.55,
  } as const,

  //  tag
  maxSignalScorePerTag: 2.5,

  // admission score
  scoreWeights: {
    
    coverage: 0.65,
    
    signal: 0.35,
  } as const,

  
  tagHitBonus: 0.18,
  
  coverageBonus: 0.45,
};


export const CREATION_AFFIX_SLOT_PLAN = {
  targetShare: {
    core: 0.28,
    identity: 0.12,
    resonance: 0.08,
    modifier: 0.52,
  } as const satisfies Record<AffixSlot, number>,
} as const;

/**
 *  listener
 *  battle-v5
 */
export const CREATION_LISTENER_PRIORITIES = {
  
  actionPreBuff: CREATION_EVENT_PRIORITY_LEVELS.ACTION_TRIGGER,
  // DOT
  dotTick: CREATION_EVENT_PRIORITY_LEVELS.ROUND_POST_DRAIN,
  
  skillCast: CREATION_EVENT_PRIORITY_LEVELS.SKILL_CAST,
  //  DamageSystem
  
  damageRequest: CREATION_EVENT_PRIORITY_LEVELS.DAMAGE_REQUEST + 1,
  
  damageApply: CREATION_EVENT_PRIORITY_LEVELS.DAMAGE_APPLY,
  
  damageApplyImmunity: CREATION_EVENT_PRIORITY_LEVELS.DAMAGE_APPLY + 1,
  
  damageTaken: CREATION_EVENT_PRIORITY_LEVELS.DAMAGE_TAKEN,
  
  roundPre: CREATION_EVENT_PRIORITY_LEVELS.ROUND_PRE,
  
  roundPostRecovery: CREATION_EVENT_PRIORITY_LEVELS.ROUND_POST_RECOVERY,
  
  roundPostDrain: CREATION_EVENT_PRIORITY_LEVELS.ROUND_POST_DRAIN,
  // Buff
  buffIntercept: CREATION_EVENT_PRIORITY_LEVELS.BUFF_INTERCEPT,
} as const;

/**
 *
 *
 * / SkillPacingRules
 */
export const CREATION_PROJECTION_BALANCE = {
  /**
   *
   * base + affix
   *  10 battle-v5
   */
  skillPriorityBase: 10,

  /**
   *
   * remaining / artifactShieldBaseDivisor
   *
   */
  artifactShieldBaseDivisor: 1.5,

  /**
   *
   *  V2 1  core +  4  core 5
   */
  defaultMaxAffixCount: 5,

  /**  Buff -1  */
  permanentBuffDuration: -1,

  /**  Spirit  */
  gongfaSpiritBuffBase: 3,
} as const;

/**
 *  ->
 *
 * “”
 *
 * -  < 18 core + 1  2
 * -  18-33core + 2  3
 * -  34-55core + 3  4
 * -  >= 56core + 4  5
 */
export const CREATION_ENERGY_SLOT_TIERS: ReadonlyArray<{
  
  maxEnergy: number;
  
  maxAffixCount: number;
}> = [
  //  25  2
  { maxEnergy: 25, maxAffixCount: 2 },
  //  50  3
  { maxEnergy: 50, maxAffixCount: 3 },
  //  90  4
  { maxEnergy: 90, maxAffixCount: 4 },
  // 90  5
  { maxEnergy: Infinity, maxAffixCount: 5 },
];

/**
 *  -> projectionQuality
 *
 *
 * - “”/ projectionQuality
 * -  `EnergyBudget.effectiveTotal`/ PBU
 * - “” UI PBU /TTK
 */
export const CREATION_PROJECTION_QUALITY_TIERS: ReadonlyArray<{
  /** effectiveTotal < maxEnergy  */
  maxEnergy: number;
  quality: Quality;
}> = [
  { maxEnergy: 18, quality: '凡品' },
  { maxEnergy: 30, quality: '灵品' },
  { maxEnergy: 45, quality: '玄品' },
  { maxEnergy: 65, quality: '真品' },
  { maxEnergy: 90, quality: '地品' },
  { maxEnergy: 125, quality: '天品' },
  { maxEnergy: 170, quality: '仙品' },
  { maxEnergy: Infinity, quality: '神品' },
];

/**
 *
 * “”
 */
export const CREATION_ROLL_POLICY = {
  // 0.7  70%1.2  120%
  globalVarianceRange: [0.7, 1.2] as [number, number],

  //  (rollEfficiency)  0.96  Perfect
  perfectThreshold: 0.95,

  
  //  1  0.002 ( 0.2%)
  //  Perfect
  energyBiasFactor: 0.002,

  // 'normal' 'uniform'
  distribution: 'normal' as 'normal' | 'uniform',
} as const;

/**
 *
 *  availableAffixEnergy  maxAffixCount
 */
export function resolveAffixSlotCount(availableAffixEnergy: number): number {
  for (const tier of CREATION_ENERGY_SLOT_TIERS) {
    if (availableAffixEnergy < tier.maxEnergy) return tier.maxAffixCount;
  }
  return CREATION_PROJECTION_BALANCE.defaultMaxAffixCount;
}
