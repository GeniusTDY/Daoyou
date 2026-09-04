import type { CultivationProgress, Cultivator } from '@shared/types/cultivator';
import {
  calculateBattleExp,
  calculateSceneCultivationExp,
} from '@shared/engine/cultivation/ExpBudgetCalculator';
import type { DailyTaskDifficulty } from '@shared/engine/cultivation/exp-gain-strategies/types';
import { REALM_ORDER, type RealmType } from '@shared/types/constants';
import {
  calculateExpProgress,
  canAttemptBreakthrough,
  getCultivationProgress,
  isBottleneckReached,
  syncBottleneckState,
} from './cultivationUtils';


export type ExpGainSource =
  | 'retreat' 
  | 'battle' 
  | 'dungeon' 
  | 'pill' 
  | 'event' 
  | 'reward' 
  | 'daily_task'; 


export interface ExpGainResult {
  success: boolean;
  exp_gained: number; 
  exp_before: number; 
  exp_after: number; 
  progress: number; 
  capped: boolean; 
  bottleneck_entered: boolean; 
  can_breakthrough: boolean; 
  message?: string; 
}


export interface ExpGainOptions {
  source: ExpGainSource;
  base_amount: number; 
  bypass_bottleneck?: boolean; 
  bypass_cap_limit?: boolean; // 30%
  insight_gain?: number; 
}

/**
 *
 * @param cultivator
 * @param options
 * @returns
 */
export function addCultivationExp(
  cultivator: Cultivator,
  options: ExpGainOptions,
): {
  result: ExpGainResult;
  updated_progress: CultivationProgress;
} {
  
  const progress = getCultivationProgress(cultivator);
  const exp_before = progress.cultivation_exp;
  const exp_cap = progress.exp_cap;
  const wasBottleneckActive = isBottleneckReached(progress);

  
  let exp_gained = options.base_amount;

  
  if (
    wasBottleneckActive &&
    options.source === 'retreat' &&
    !options.bypass_bottleneck
  ) {
    exp_gained *= 0.5;
  }

  //  cap cap
  let capped = false;
  const potential_exp = exp_before + exp_gained;
  if (potential_exp > exp_cap) {
    capped = true;
  }

  
  progress.cultivation_exp = exp_before + exp_gained;

  
  if (options.insight_gain && options.insight_gain > 0) {
    progress.comprehension_insight = Math.min(
      100,
      progress.comprehension_insight + options.insight_gain,
    );
  }

  
  const bottleneckActive = syncBottleneckState(progress);
  const bottleneck_entered = !wasBottleneckActive && bottleneckActive;

  
  let message = '';
  if (capped) {
    message = '修为已达当前境界上限，可尝试突破。';
  } else if (bottleneck_entered && options.source === 'retreat') {
    message =
      '修为渐近圆满，已入瓶颈期。闭关效率降低，建议通过其他方式积累感悟。';
  }

  return {
    result: {
      success: true,
      exp_gained,
      exp_before,
      exp_after: progress.cultivation_exp,
      progress: calculateExpProgress(progress),
      capped,
      bottleneck_entered,
      can_breakthrough: canAttemptBreakthrough(progress),
      message,
    },
    updated_progress: progress,
  };
}

/**
 *
 * @param cultivator
 * @param enemy_realm
 * @param victory_type
 */
export function calculateBattleExpGain(
  cultivator: Cultivator,
  enemy_realm: string,
  victory_type: 'normal' | 'perfect' | 'challenged',
): number {
  
  const myIndex = REALM_ORDER[cultivator.realm] ?? 0;
  const enemyIndex = REALM_ORDER[enemy_realm as RealmType] ?? myIndex;
  const realmDiff = enemyIndex - myIndex;

  return calculateBattleExp(
    cultivator.realm,
    cultivator.realm_stage,
    realmDiff,
    victory_type,
    cultivator.cultivation_progress?.exp_cap,
  );
}

/**
 *
 * @param cultivator
 * @param dungeon_result
 */
export function calculateDungeonExpGain(
  cultivator: Cultivator,
  dungeon_result: 'perfect' | 'good' | 'normal' | 'failed',
): number {
  if (!cultivator.cultivation_progress) {
    return 0;
  }

  const exp_cap = cultivator.cultivation_progress.exp_cap;

  return calculateSceneCultivationExp('dungeon', {
    realm: cultivator.realm,
    realmStage: cultivator.realm_stage,
    expCap: exp_cap,
    result: dungeon_result,
  }).baseExp;
}

/**
 *
 * @param cultivator
 * @param pill_quality
 */
export function calculatePillExpGain(
  cultivator: Cultivator,
  pill_quality: '凡品' | '灵品' | '玄品' | '真品',
): {
  exp_gain: number;
  can_use: boolean;
  reason?: string;
} {
  if (!cultivator.cultivation_progress) {
    return { exp_gain: 0, can_use: false, reason: '修为数据异常' };
  }

  // 30%
  // TODO: cultivation_progresspill_exp_gained
  

  return {
    exp_gain: calculateSceneCultivationExp('pill', {
      realm: cultivator.realm,
      realmStage: cultivator.realm_stage,
      expCap: cultivator.cultivation_progress.exp_cap,
      quality: pill_quality,
    }).baseExp,
    can_use: true,
  };
}

/**
 *
 * @param cultivator
 * @param difficulty
 */
export function calculateDailyTaskExpGain(
  cultivator: Cultivator,
  difficulty: DailyTaskDifficulty = 'normal',
): number {
  if (!cultivator.cultivation_progress) {
    return 0;
  }

  return calculateSceneCultivationExp('daily_task', {
    realm: cultivator.realm,
    realmStage: cultivator.realm_stage,
    expCap: cultivator.cultivation_progress.exp_cap,
    difficulty,
  }).baseExp;
}
