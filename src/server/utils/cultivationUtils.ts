import { EXP_CAP_TABLE } from '@shared/config/cultivationProgress';
import {
  BOTTLENECK_EXP_PENALTY,
  BOTTLENECK_THRESHOLD,
  BREAKTHROUGH_MIN_PROGRESS,
  DEFAULT_SPIRITUAL_ROOT_STRENGTH,
  EPIPHANY_CHANCE,
  EPIPHANY_EXP_MULTIPLIER,
  EPIPHANY_INSIGHT_MIN,
  EPIPHANY_INSIGHT_RANGE,
  FAILURE_LOSS_PARAMS,
  MAX_NORMAL_INSIGHT,
  NO_TECHNIQUE_MULTIPLIER,
  NORMAL_BREAKTHROUGH_THRESHOLD,
  NORMAL_INSIGHT_SCALE,
  PERFECT_BREAKTHROUGH_INSIGHT,
  RANDOM_FACTOR_LOW,
  RANDOM_FACTOR_RANGE,
  SPIRITUAL_ROOT_BASE,
  TECHNIQUE_FALLBACK_QUALITY,
  TECHNIQUE_MIN_MULTIPLIER,
  TECHNIQUE_QUALITY_MULTIPLIERS,
  YEARS_MULTIPLIER_BASE,
  YEARS_MULTIPLIER_SCALE,
} from '@shared/config/cultivationTuning';
import type { RealmStage, RealmType } from '@shared/types/constants';
import type {
  CultivationProgress,
  Cultivator,
  SpiritualRoot,
} from '@shared/types/cultivator';
import { calculateRetreatBaseExp } from '@shared/engine/cultivation/ExpBudgetCalculator';

/**
 *
 *
 *  exp_cap ——
 *
 */
export function resolveLiveExpCap(
  realm: RealmType,
  realm_stage: RealmStage,
): number {
  return EXP_CAP_TABLE[realm]?.[realm_stage] ?? EXP_CAP_TABLE['炼气']['初期'];
}

/**
 *  exp_cap  CultivationProgress
 *
 * exp_cap
 *  EXP_CAP_TABLE
 */
export function stripExpCapForStorage(
  progress: CultivationProgress,
): CultivationProgress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { exp_cap: _removed, ...rest } = progress;
  return {
    ...rest,
    bottleneck_state: isBottleneckReached(progress),
  } as CultivationProgress;
}

export function getCultivationProgress(
  cultivator: Pick<
    Cultivator,
    'realm' | 'realm_stage' | 'cultivation_progress'
  >,
): CultivationProgress {
  //  cultivation_exp exp_cap
  if (
    !cultivator.cultivation_progress ||
    cultivator.cultivation_progress.cultivation_exp === undefined
  ) {
    cultivator.cultivation_progress = createDefaultCultivationProgress(
      cultivator.realm,
      cultivator.realm_stage,
    );
  }
  // exp_cap
  cultivator.cultivation_progress.exp_cap = resolveLiveExpCap(
    cultivator.realm,
    cultivator.realm_stage,
  );
  syncBottleneckState(cultivator.cultivation_progress);
  return cultivator.cultivation_progress;
}

export function getOrInitCultivationProgress(
  cultivation_progress: CultivationProgress,
  realm: RealmType,
  realm_stage: RealmStage,
): CultivationProgress {
  const progress =
    cultivation_progress && cultivation_progress.cultivation_exp !== undefined
      ? cultivation_progress
      : createDefaultCultivationProgress(realm, realm_stage);
  // exp_cap
  progress.exp_cap = resolveLiveExpCap(realm, realm_stage);
  syncBottleneckState(progress);
  return progress;
}

/**
 *
 *
 * exp_cap
 *  stripExpCapForStorage()
 */
export function createDefaultCultivationProgress(
  realm: RealmType,
  realm_stage: RealmStage,
): CultivationProgress {
  return {
    cultivation_exp: 0,
    exp_cap: resolveLiveExpCap(realm, realm_stage),
    comprehension_insight: 0,
    breakthrough_failures: 0,
    bottleneck_state: false,
    inner_demon: false,
    deviation_risk: 0,
  };
}

/**
 * strength
 */
export function getMainSpiritualRootStrength(
  spiritual_roots: SpiritualRoot[],
): number {
  if (!spiritual_roots || spiritual_roots.length === 0) {
    return DEFAULT_SPIRITUAL_ROOT_STRENGTH;
  }

  let maxStrength = spiritual_roots[0].strength;
  for (const root of spiritual_roots) {
    if (root.strength > maxStrength) {
      maxStrength = root.strength;
    }
  }

  return maxStrength;
}

/**
 *
 * SPIRITUAL_ROOT_BASE + ( / 100)
 */
export function calculateSpiritualRootMultiplier(
  spiritual_roots: SpiritualRoot[],
): number {
  const strength = getMainSpiritualRootStrength(spiritual_roots);
  return SPIRITUAL_ROOT_BASE + strength / 100;
}


export function getCultivationTechniqueMultiplier(
  cultivator: Pick<Cultivator, 'cultivations'>,
): number {
  if (!cultivator.cultivations || cultivator.cultivations.length === 0) {
    return NO_TECHNIQUE_MULTIPLIER;
  }

  let maxMultiplier = TECHNIQUE_MIN_MULTIPLIER;
  for (const cultivation of cultivator.cultivations) {
    const multiplier =
      TECHNIQUE_QUALITY_MULTIPLIERS[cultivation.quality ?? TECHNIQUE_FALLBACK_QUALITY] ??
      TECHNIQUE_MIN_MULTIPLIER;
    if (multiplier > maxMultiplier) {
      maxMultiplier = multiplier;
    }
  }

  return maxMultiplier;
}

/**
 *
 * YEARS_MULTIPLIER_BASE + YEARS_MULTIPLIER_SCALE × √(log₁₀(years + 1))
 */
export function calculateYearsMultiplier(years: number): number {
  if (years <= 0) return 1.0;
  return YEARS_MULTIPLIER_BASE + YEARS_MULTIPLIER_SCALE * Math.sqrt(Math.log10(years + 1));
}

/**
 *  EPIPHANY_CHANCE
 */
export function calculateEpiphanyChance(): number {
  return EPIPHANY_CHANCE;
}

/**
 *
 * min(MAX_NORMAL_INSIGHT, floor(√years × NORMAL_INSIGHT_SCALE × rng))
 */
export function calculateNormalInsightGain(
  years: number,
  rng: () => number = Math.random,
): number {
  if (years <= 0) return 0;
  const base = Math.sqrt(years) * NORMAL_INSIGHT_SCALE * rng();
  return Math.min(MAX_NORMAL_INSIGHT, Math.floor(base));
}

/**
 *
 *  ×  ×  ×  ×
 */
export interface CultivationExpResult {
  exp_gained: number; 
  epiphany_triggered: boolean; 
  insight_gained: number; 
}

export function calculateCultivationExp(
  cultivator: Pick<
    Cultivator,
    | 'realm'
    | 'realm_stage'
    | 'cultivation_progress'
    | 'spiritual_roots'
    | 'cultivations'
  >,
  years: number,
  rng: () => number = Math.random,
): CultivationExpResult {
  // 1.  cap
  const baseExp = calculateRetreatBaseExp(
    cultivator.realm,
    cultivator.realm_stage,
    years,
    cultivator.cultivation_progress?.exp_cap,
  );

  // 2.
  const spiritualRootMultiplier = calculateSpiritualRootMultiplier(
    cultivator.spiritual_roots,
  );

  // 3.
  const techniqueMultiplier = getCultivationTechniqueMultiplier(cultivator);

  // 4.
  const yearsMultiplier = calculateYearsMultiplier(years);

  // 5.
  const randomFactor = RANDOM_FACTOR_LOW + rng() * RANDOM_FACTOR_RANGE;

  // 6.
  const epiphanyChance = calculateEpiphanyChance();
  const epiphany_triggered = rng() < epiphanyChance;

  // 7.
  let exp_gained =
    baseExp *
    spiritualRootMultiplier *
    techniqueMultiplier *
    yearsMultiplier *
    randomFactor;

  // 8.  +
  let insight_gained: number;
  if (epiphany_triggered) {
    exp_gained *= EPIPHANY_EXP_MULTIPLIER;
    insight_gained = Math.floor(EPIPHANY_INSIGHT_MIN + rng() * EPIPHANY_INSIGHT_RANGE);
  } else {
    // 9.
    insight_gained = calculateNormalInsightGain(years, rng);
  }

  // 10.
  const progress = cultivator.cultivation_progress;
  if (progress && isBottleneckReached(progress)) {
    exp_gained *= BOTTLENECK_EXP_PENALTY;
  }

  return {
    exp_gained: Math.floor(exp_gained),
    epiphany_triggered,
    insight_gained,
  };
}


export function calculateExpProgress(progress: CultivationProgress): number {
  if (!progress.exp_cap || progress.exp_cap === 0) return 0;
  return Math.min(100, (progress.cultivation_exp / progress.exp_cap) * 100);
}


export function isBottleneckReached(progress: CultivationProgress): boolean {
  return calculateExpProgress(progress) >= BOTTLENECK_THRESHOLD;
}


export function syncBottleneckState(progress: CultivationProgress): boolean {
  const active = isBottleneckReached(progress);
  progress.bottleneck_state = active;
  return active;
}


export function canAttemptBreakthrough(progress: CultivationProgress): boolean {
  return calculateExpProgress(progress) >= BREAKTHROUGH_MIN_PROGRESS;
}


export function getBreakthroughType(
  progress: CultivationProgress,
): 'forced' | 'normal' | 'perfect' {
  const expProgress = calculateExpProgress(progress);

  if (expProgress >= 100 && progress.comprehension_insight >= PERFECT_BREAKTHROUGH_INSIGHT) {
    return 'perfect';
  } else if (expProgress >= NORMAL_BREAKTHROUGH_THRESHOLD) {
    return 'normal';
  } else {
    return 'forced';
  }
}


export function calculateExpLossOnFailure(
  progress: CultivationProgress,
  rng: () => number = Math.random,
): number {
  const breakthroughType = getBreakthroughType(progress);
  const params = FAILURE_LOSS_PARAMS[breakthroughType];

  const baseLossRatio = params.baseLow + rng() * params.baseRange;
  const insightProtection = progress.comprehension_insight / params.insightDivisor;
  const actualLossRatio = baseLossRatio * (1 - insightProtection);

  return Math.floor(progress.cultivation_exp * actualLossRatio);
}
