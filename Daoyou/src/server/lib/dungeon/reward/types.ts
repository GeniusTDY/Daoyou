/**
 *  -
 *
 * "AI + "
 * - AI
 * -
 */

import type { ElementType } from '@shared/types/constants';

/**
 *  -
 * Simplified: removed artifact and consumable generation
 * These can still be gained from other sources, but not from dungeon rewards
 *
 * AI  material
 */
export type RewardType =
  | 'spirit_stones'
  | 'material'
  | 'cultivation_exp'
  | 'comprehension_insight';

/**
 * AI -
 */
export interface RewardBlueprint {
  /**  (AI) -  material  */
  name?: string;

  /**  (AI) -  material  */
  description?: string;

  /**  (0-100) -  material  */
  reward_score?: number;

  /**  -  material  */
  element?: ElementType;

  /**  -  material  */
  material_type?:
    | 'herb'
    | 'ore'
    | 'monster'
    | 'tcdb'
    | 'aux'
    | 'gongfa_manual'
    | 'skill_manual';
}


export interface ValueRange {
  min: number;
  max: number;
}


export interface RewardRangeConfig {
  
  spirit_stones: ValueRange;
  
  material_price: ValueRange;
  
  cultivation_exp: ValueRange;
  
  comprehension_insight: ValueRange;
}
