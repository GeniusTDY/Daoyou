// =====  =====

import type { AbilityConfig } from '@shared/engine/creation-v2/contracts/battle';
import type { AttributeModifierConfig } from '@shared/engine/battle-v5/core/configs';
import type { ConsumableSpec } from '@shared/types/consumable';
import type { CultivatorCondition } from '@shared/types/condition';
import type { CultivatorSectState, PlayerRaceId } from '@shared/engine/sect';
import type {
  ConsumableType,
  ElementType,
  EnemyRace,
  EquipmentSlot,
  GenderType,
  MaterialType,
  Quality,
  RealmStage,
  RealmType,
  SpiritualRootGrade,
} from './constants';

/**
 *
 *
 *   battle-v5
 *  AttributeSystem/AttrsStateView  DB
 *
 *
 *   `CultivatorDisplayAdapter.snapshot(cultivator)`
 *   `getCultivatorDisplayAttributes(cultivator)`  AttrsStateView
 */
export interface Attributes {
  vitality: number; 
  strength: number; 
  spirit: number; 
  endurance: number; 
  speed: number; 
  willpower: number; 
}


export interface SpiritualRoot {
  element: ElementType;
  strength: number; // effective strength, capped by current systems
  baseStrength?: number; // original persisted strength before acquired bonuses
  marrowWashBonus?: number; // acquired bonus from marrow-wash breakthroughs
  grade?: SpiritualRootGrade; //  |  |  |
}

export interface RetreatRecordModifiers {
  comprehension: number;
  years: number;
  failureStreak: number;
}

export interface RetreatRecord {
  realm: RealmType;
  realm_stage: RealmStage;
  years: number;
  success: boolean;
  chance: number;
  roll: number;
  timestamp: string;
  modifiers: RetreatRecordModifiers;
  
  exp_gained?: number; 
  exp_before?: number; 
  exp_after?: number; 
  insight_gained?: number; 
  epiphany_triggered?: boolean; 
}

export interface BreakthroughHistoryEntry {
  from_realm: RealmType;
  from_stage: RealmStage;
  to_realm: RealmType;
  to_stage: RealmStage;
  age: number;
  years_spent: number;
  story?: string;
  
  exp_progress?: number; // 0-100
  insight_value?: number; 
  exp_lost_on_failure?: number; 
  breakthrough_type?: 'forced' | 'normal' | 'perfect'; 
}

//  /
export type FateEffectScope = 'daily' | 'drawback';

export type FateEffectPolarity = 'boon' | 'burden';

export type FateEffectType =
  | 'retreat_exp_multiplier'
  | 'retreat_insight_multiplier'
  | 'breakthrough_bonus'
  | 'natural_recovery_multiplier'
  | 'toxicity_penalty_multiplier'
  | 'alchemy_spirit_stone_multiplier'
  | 'refine_spirit_stone_multiplier'
  | 'enlightenment_insight_multiplier'
  | 'inn_cultivation_loss_multiplier'
  | 'system_spirit_stone_multiplier'
  | 'market_purchase_price_multiplier';

export interface FateEffectRollMeta {
  qualityAnchor: Quality;
  minValue: number;
  maxValue: number;
  rolledPercentile: number;
  roundingStep: number;
  variancePercentile?: number;
  varianceMultiplier?: number;
  strengthMultiplier?: number;
}

export interface FateEffectEntry {
  id: string;
  effectId: string;
  scope: FateEffectScope;
  polarity: FateEffectPolarity;
  effectType: FateEffectType;
  value: number;
  label: string;
  description: string;
  rollMeta: FateEffectRollMeta;
}

export type FateGenerationCategory = 'single_positive' | 'dual_sided';

export interface FateGenerationModel {
  version: string;
  rollVersion: string;
  quality: Quality;
  effectIds: string[];
  compositionHash: string;
  category: FateGenerationCategory;
}

export interface FateNamingMetadata {
  status: 'success' | 'fallback';
  originalName?: string;
  provider?: string;
  styleInsight?: string;
}

export interface PreHeavenFate {
  name: string;
  quality?: Quality;
  description?: string;
  effects?: FateEffectEntry[];
  generationModel?: FateGenerationModel;
  namingMetadata?: FateNamingMetadata;
}


export interface CultivationTechnique {
  id?: string;
  name: string;
  element?: ElementType;
  quality?: Quality;
  score?: number;
  description?: string;
  attributeModifiers?: AttributeModifierConfig[];
  /**  productModel  */
  abilityConfig?: AbilityConfig;
  /** / creation_products.product_model */
  productModel?: unknown;
}


export interface Skill {
  id?: string;
  name: string;
  element: ElementType;
  quality?: Quality;
  score?: number;
  cost?: number;
  cooldown: number;
  target_self?: boolean;
  description?: string;
  /**  productModel  */
  abilityConfig?: AbilityConfig;
  /** / creation_products.product_model */
  productModel?: unknown;
}

export interface Artifact {
  id?: string;
  name: string;
  slot: EquipmentSlot;
  element: ElementType;
  quality?: Quality;
  description?: string;
  attributeModifiers?: AttributeModifierConfig[];
  /**  productModel  */
  abilityConfig?: AbilityConfig;
  prompt?: string;
  score?: number;
  /** / creation_products.product_model */
  productModel?: unknown;
  /**  battle/display  */
  battleRuntimeMeta?: {
    anchorRealm?: RealmType;
    anchorRealmStage?: RealmStage;
  };
  
  isEquipped?: boolean;
}

export interface Consumable {
  id?: string;
  name: string;
  type: ConsumableType;
  quality?: Quality;
  quantity: number;
  description?: string;
  prompt?: string; 
  score?: number; 
  spec: ConsumableSpec;
}

export interface MaterialDetails {
  [key: string]: unknown;
}

export interface Material {
  id?: string;
  name: string;
  type: MaterialType;
  rank: Quality;
  price?: number;
  element?: ElementType;
  description?: string;
  details?: MaterialDetails;
  quantity: number;
}

export interface Inventory {
  artifacts: Artifact[];
  consumables: Consumable[];
  materials: Material[];
}

export interface EquippedItems {
  weapon: string | null;
  armor: string | null;
  accessory: string | null;
}


export interface CultivationProgress {
  cultivation_exp: number; 
  exp_cap: number; 
  comprehension_insight: number; // 0-100
  breakthrough_failures: number; 
  bottleneck_state: boolean; 
  inner_demon: boolean; // debuff
  deviation_risk: number; // 0-100
  last_epiphany_at?: string; // ISO
  epiphany_buff_expires_at?: string; // buffISO
}

//  basic.md  JSON Schema
export interface Cultivator {
  id?: string;
  createdAt?: string;
  name: string;
  title?: string | null;
  gender: GenderType;
  /**  EnemyRace  */
  playerRace?: PlayerRaceId;
  raceNarrative?: string;
  /** / cultivators JSON */
  sect?: CultivatorSectState;
  
  race?: EnemyRace;
  origin?: string;
  personality?: string;

  realm: RealmType;
  realm_stage: RealmStage;
  age: number;
  lifespan: number;
  status?: 'active' | 'dead';
  closed_door_years_total?: number;
  retreat_records?: RetreatRecord[];
  breakthrough_history?: BreakthroughHistoryEntry[];

  attributes: Attributes;
  unallocated_attribute_points?: number;
  spiritual_roots: SpiritualRoot[];
  pre_heaven_fates: PreHeavenFate[];
  cultivations: CultivationTechnique[];
  skills: Skill[];

  inventory: Inventory;
  equipped: EquippedItems;

  spirit_stones: number;
  reputation?: number;
  last_yield_at?: Date;
  background?: string;
  description?: string;

  //  & AI prompt
  prompt?: string;
  balance_notes?: string;

  
  cultivation_progress?: CultivationProgress;

  // /
  condition?: CultivatorCondition;

}
