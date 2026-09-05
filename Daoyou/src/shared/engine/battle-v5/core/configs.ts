import { StackRule } from '../buffs/Buff';
import {
  AbilityType,
  AttributeType,
  BuffType,
  DamageSource,
  DamageType,
  type LogCauseRef,
  ModifierType,
} from './types';

import { ScalableValue } from './ValueCalculator';
import type { CombatVisualSpec } from '../presentation/CombatVisualProtocol';

export type AbilitySelectionIntent =
  'damage' | 'heal_hp' | 'restore_mp' | 'control' | 'buff' | 'defensive';

export interface AbilitySelectionProfile {
  intents?: AbilitySelectionIntent[];
  rules?: AbilitySelectionRule[];
}

export interface AbilitySelectionRule {
  conditions: ConditionConfig[];
  scoreDelta?: number;
  disqualify?: boolean;
}

export type AbilityCostConfig =
  | {
      resource: 'mp' | 'hp';
      mode: 'flat';
      amount: number;
      retain?: number;
      conditions?: ConditionConfig[];
    }
  | {
      resource: 'hp';
      mode: 'current_hp_ratio' | 'current_percent';
      ratio: number;
      minimum?: number;
      retain?: number;
      conditions?: ConditionConfig[];
    };

/**
 *  effects/completionEffects  A ID
 */
export interface AbilityEffectLayerConfig {
  id: string;
  
  displayName?: string;
  effects?: EffectConfig[];
  completionEffects?: EffectConfig[];
}

/**
 *  AI
 */
export interface AbilityEffectPlanConfig {
  id: string;
  name: string;
  description?: string;
  priority: number;
  conditions: ConditionConfig[];
  layerIds: string[];
  consumeModeKey?: string;
}

export interface CombatResourceDefinition {
  id: string;
  name: string;
  
  icon?: string;
  initial: number;
  max: number;
  decayOnNoDirectDamage?: number;
  /**  1 */
  noDirectDamageActionsPerDecay?: number;
  decayOnControlledSkip?: number;
  pauseDecayWhileShielded?: boolean;
  pauseDecayWhenCounterAtLeast?: {
    key: string;
    value: number;
  };
}


export interface ConditionConfig {
  type:
    | 'has_tag'
    | 'has_not_tag'
    | 'has_tag_on'
    | 'ability_has_tag'
    | 'ability_has_any_tag'
    | 'ability_has_exact_tag'
    | 'ability_has_not_tag'
    | 'source_has_tag'
    | 'hp_above'
    | 'hp_below'
    | 'mp_above'
    | 'mp_below'
    | 'ability_mp_cost_at_least'
    | 'has_shield'
    | 'buff_count_at_least'
    | 'buff_layer_at_least'
    | 'buff_layer_below'
    | 'debuff_count_at_least'
    | 'damage_type_is'
    | 'damage_source_is'
    | 'shield_absorbed_at_least'
    | 'damage_taken_at_least'
    | 'resource_compare'
    | 'attribute_compare'
    | 'combat_resource_at_least'
    | 'combat_resource_below'
    | 'runtime_counter_compare'
    | 'ability_mode_is'
    | 'ability_cost_crossed'
    | 'combat_resource_change'
    | 'buff_layer_change'
    | 'buff_removed_reason_is'
    | 'chance'
    | 'is_critical'
    | 'is_hit'
    | 'is_lethal';
  params: {
    tag?: string;
    tags?: string[];
    id?: string;
    value?: number;
    //  target
    // hp/mp  caster/target
    scope?: 'caster' | 'target';
    resource?: 'hp' | 'mp';
    attribute?: AttributeType;
    left?: 'caster' | 'target';
    op?: 'gt' | 'gte' | 'lt' | 'lte';
    right?: 'caster' | 'target';
    damageType?: DamageType;
    damageSource?: `${DamageSource}`;
    resourceId?: string;
    key?: string;
    mode?: string;
    remainingUses?: number;
    timing?: 'live' | 'cast';
    operation?: 'add' | 'subtract' | 'set' | 'consume_all';
    eventField?:
      | 'requested'
      | 'applied'
      | 'overflow'
      | 'previousLayer'
      | 'currentLayer'
      | 'delta';
    reason?:
      | 'apply'
      | 'stack'
      | 'effect'
      | 'dispel'
      | 'manual'
      | 'expired'
      | 'replace';
  };
}


export interface BaseEffectConfig {
  conditions?: ConditionConfig[];
  globalUnique?: GlobalUniqueConfig;
}

/**
 *  GE  ()
 */


export interface DamageParams {
  value: ScalableValue;
  damageType?: DamageType;
  bypassDefense?: boolean;
  /** 01 */
  bypassDefenseRatio?: number;
  damageSource?: DamageSource;
  cause?: LogCauseRef;
  forceCritical?: boolean;
  forceCriticalConditions?: ConditionConfig[];
  /**  true */
  canCrit?: boolean;
  /**  true */
  canLifesteal?: boolean;
  dynamicScalars?: DamageDynamicScalarConfig[];
}

export interface DamageDynamicScalarConfig {
  source: 'target_missing_hp_ratio';
  attribute: AttributeType;
  coefficientCap: number;
  
  minMissingHpRatio?: number;
  timing?: 'live' | 'cast';
}


export interface HealParams {
  value: ScalableValue;
  target?: 'hp' | 'mp';
  recipient?: 'caster' | 'target';
}

/**
 * BUFF
 */
export interface ApplyBuffParams {
  buffConfig: BuffConfig;
  chance?: number;
  /**  1 */
  layers?: number;
  target?: 'caster' | 'target';
  
  controlHitBonus?: number;
  /** Buff  */
  onResistEffects?: EffectConfig[];
}


export interface ResourceDrainParams {
  sourceType: 'hp' | 'mp';
  targetType: 'hp' | 'mp';
  ratio: number;
}

/**
 * DEBUFF
 */
export interface DispelParams {
  targetTag?: string;
  maxCount?: number;
  /**  target */
  recipient?: 'caster' | 'target';
  /** positive=negative= */
  status?: 'positive' | 'negative';
  
  effects?: EffectConfig[];
  
  fallbackEffects?: EffectConfig[];
}


export interface ShieldParams {
  value: ScalableValue;
  target?: 'caster' | 'target';
}


export interface MagicShieldParams {
  absorbRatio?: number;
}


export interface ReflectParams {
  ratio: number;
  ratioPerLayer?: number;
  layerBuffId?: string;
  maxHpRatioPerAction?: number;
}

/**
 * burn
 */
export interface ManaBurnParams {
  value: ScalableValue;
}


export interface CooldownModifyParams {
  cdModifyValue: number;
  tags?: string[];
  maxCount?: number;
  target?: 'caster' | 'target';
  includeCurrent?: boolean;
}

export interface SkipActionParams {
  count?: number;
  reason: string;
  name?: string;
}

export interface QueueActionParams {
  id: string;
  name: string;
  effects: EffectConfig[];
  tags: string[];
  targetPolicy?: AbilityConfig['targetPolicy'];
  interruptPolicy?: 'normal' | 'uninterruptible';
  hitPolicy?: 'normal' | 'guaranteed';
  cancelEffects?: EffectConfig[];
}

export interface ResourceScaledDamageParams {
  resourceId: string;
  baseCoefficient: number;
  coefficientPerPoint: number;
  minPoints?: number;
  maxPoints?: number;
  consume?: 'all' | number;
  attribute?: AttributeType;
  damageType?: DamageType;
  bypassDefenseRatio?: number;
  damageSource?: DamageSource;
  forceCritical?: boolean;
}

export interface BuffDurationModifyParams {
  rounds: number;
  tags?: string[];
}


export interface TagTriggerParams {
  triggerTag: string;
  displayName?: string;
  damageRatio?: number;
  removeOnTrigger?: boolean;
  effects?: EffectConfig[];
}

export interface BuffMatchParams {
  id?: string;
  tags?: string[];
}

export interface ConsumeStatusTriggerParams {
  match: BuffMatchParams;
  /** ID */
  displayName?: string;
  consume?: 'one' | 'all' | number;
  effects: EffectConfig[];
  
  fallbackEffects?: EffectConfig[];
  scaleEffectsByLayer?: boolean;
  
  aggregateDamageByLayer?: boolean;
  target?: 'caster' | 'target';
}

export interface DelayedEffectParams {
  id: string;
  name: string;
  description?: string;
  delayTurns: number;
  effects: EffectConfig[];
  tags?: string[];
  statusTags?: string[];
  record?: {
    key: string;
    event: 'damage_taken' | 'heal' | 'shield' | 'shield_break';
    maxStored?: number;
    maxStoredValue?: ScalableValue;
  };
  triggerOnDispel?: boolean;
  maxTriggers?: number;
}

export interface DamageMemoryParams {
  key: string;
  mode: 'record' | 'release' | 'clear';
  event?:
    | 'damage_taken'
    | 'damage_dealt'
    | 'heal'
    | 'shield'
    | 'critical_taken'
    | 'shield_break'
    | 'shield_absorbed';
  ratio?: number;
  releaseAs?:
    | 'damage'
    | 'heal'
    | 'shield'
    | 'reflect'
    | 'counter'
    | 'follow_up'
    | 'resolved_follow_up';
  damageType?: DamageType;
  damageTags?: string[];
  cause?: LogCauseRef;
  target?: 'caster' | 'target';
  maxStored?: number;
  maxStoredValue?: ScalableValue;
  includeShieldAbsorbed?: boolean;
  consume?: boolean;
}

export interface BuffLayerModifyParams {
  match: BuffMatchParams;
  operation: 'add' | 'subtract' | 'clear' | 'set';
  layers?: number;
  effects?: EffectConfig[];
  scaleEffectsByLayer?: boolean;
  target?: 'caster' | 'target';
  logVisibility?: 'player' | 'debug';
}

export interface CombatResourceModifyParams {
  resourceId: string;
  operation: 'add' | 'subtract' | 'set' | 'consume_all';
  amount?: number;
  target?: 'caster' | 'target';
  effects?: EffectConfig[];
  scaleEffectsByAmount?: boolean;
  reason?: 'gain' | 'spend' | 'refund';
}

export type RefundPaidCostParams =
  | {
      amount: number;
      ratio?: never;
      resource?: 'mp';
    }
  | {
      amount?: never;
      ratio: number;
      resource?: 'mp';
    };

export interface MechanicLogParams {
  mechanic: 'named_trigger' | 'status_transition';
  displayName: string;
  internalKey: string;
  target?: 'caster' | 'target';
  visibility?: 'player' | 'debug';
  operation?: 'apply' | 'refresh' | 'replace' | 'consume';
  previousDisplayName?: string;
}

export interface AbilityTransformParams {
  id: string;
  triggers?: number;
  appliesToTags?: string[];
  trueDamage?: boolean;
  addDispel?: DispelParams;
  mpCostToHp?: boolean;
  freeManaCost?: boolean;
  cooldownModify?: number;
  forceCritical?: boolean;
  bonusDamageMemory?: {
    key: string;
    ratio?: number;
    consume?: boolean;
  };
}

export interface HpSacrificeDamageParams {
  hpRatio: number;
  damagePerHp: number;
  minHpFloor?: number;
}

export interface AbilityLockParams {
  rounds: number;
  tags?: string[];
  maxCount?: number;
}

export interface StatusSpreadParams {
  match: BuffMatchParams;
  maxCount?: number;
}

export interface BuffCopyParams {
  id?: string;
  match?: BuffMatchParams;
  target?: 'caster' | 'target';
  durationDelta?: number;
  replayRemoved?: boolean;
  maxTriggers?: number;
}

export interface DamageDeferParams {
  ratio: number;
  delayTurns: number;
  thresholdMaxHpRatio?: number;
  memory?: {
    key: string;
    maxStoredValue?: ScalableValue;
  };
}

export interface NextHitRuleParams {
  forceCritical?: boolean;
  triggers?: number;
  appliesToTags?: string[];
}

export interface DynamicScalarParams {
  mode: 'increase' | 'reduce';
  value: number;
  resource: 'hp' | 'mp';
  lowerIsStronger?: boolean;
  cap?: number;
}

export interface TurnStateCounterParams {
  key: string;
  event: 'no_damage_dealt' | 'damage_dealt';
  threshold: number;
  effects: EffectConfig[];
  resetOnTrigger?: boolean;
}

export interface RuntimeCounterModifyParams {
  key: string;
  operation: 'add' | 'subtract' | 'set' | 'reset';
  amount?: number;
  amountFromEvent?: 'requested' | 'applied' | 'overflow';
  target?: 'caster' | 'target';
  min?: number;
  max?: number;
  effects?: EffectConfig[];
  scaleEffectsByAmount?: boolean;
}

export interface EffectSequenceParams {
  effects: EffectConfig[];
}

export interface AbilityModeParams {
  key: string;
  operation: 'set' | 'advance' | 'clear';
  mode?: string;
  remainingUses?: number;
  displayName?: string;
  
  cleanupBuffIds?: string[];
}

export interface LifestealParams {
  ratio: number;
  maxHpRatioPerAction: number;
}


export interface PercentDamageModifierParams {
  mode: 'increase' | 'reduce';
  value: number;
  cap?: number;
  
  logTriggerName?: string;
  /**  Buff  */
  scaleByBuffLayer?: boolean;
  allowedDamageSources?: DamageSource[];
  excludedDamageTypes?: DamageType[];
}


export interface DeathPreventParams {
  /** =1 */
  hpFloorPercent?: number;
  /**  key */
  triggerKey?: string;
}

/**
 * BUFF
 */
export interface BuffImmunityParams {
  tags: string[];
}


export interface DamageImmunityParams {
  tags: string[];
}

/**
 *
 *  SkillPreCastEvent  Buff
 */
export interface SkillImmunityParams {
  reason?: string;
}


export type EffectConfig = BaseEffectConfig &
  (
    | { type: 'damage'; params: DamageParams }
    | { type: 'heal'; params: HealParams }
    | { type: 'apply_buff'; params: ApplyBuffParams }
    | { type: 'resource_drain'; params: ResourceDrainParams }
    | { type: 'dispel'; params: DispelParams }
    | { type: 'shield'; params: ShieldParams }
    | { type: 'magic_shield'; params: MagicShieldParams }
    | { type: 'reflect'; params: ReflectParams }
    | { type: 'mana_burn'; params: ManaBurnParams }
    | { type: 'cooldown_modify'; params: CooldownModifyParams }
    | { type: 'buff_duration_modify'; params: BuffDurationModifyParams }
    | { type: 'tag_trigger'; params: TagTriggerParams }
    | { type: 'consume_status_trigger'; params: ConsumeStatusTriggerParams }
    | { type: 'delayed_effect'; params: DelayedEffectParams }
    | { type: 'damage_memory'; params: DamageMemoryParams }
    | { type: 'refund_paid_cost'; params: RefundPaidCostParams }
    | { type: 'mechanic_log'; params: MechanicLogParams }
    | { type: 'buff_layer_modify'; params: BuffLayerModifyParams }
    | { type: 'combat_resource_modify'; params: CombatResourceModifyParams }
    | { type: 'ability_transform'; params: AbilityTransformParams }
    | { type: 'hp_sacrifice_damage'; params: HpSacrificeDamageParams }
    | { type: 'ability_lock'; params: AbilityLockParams }
    | { type: 'status_spread'; params: StatusSpreadParams }
    | { type: 'buff_copy'; params: BuffCopyParams }
    | { type: 'damage_defer'; params: DamageDeferParams }
    | { type: 'next_hit_rule'; params: NextHitRuleParams }
    | { type: 'dynamic_scalar'; params: DynamicScalarParams }
    | { type: 'turn_state_counter'; params: TurnStateCounterParams }
    | { type: 'runtime_counter_modify'; params: RuntimeCounterModifyParams }
    | { type: 'effect_sequence'; params: EffectSequenceParams }
    | { type: 'ability_mode'; params: AbilityModeParams }
    | { type: 'lifesteal'; params: LifestealParams }
    | { type: 'percent_damage_modifier'; params: PercentDamageModifierParams }
    | { type: 'death_prevent'; params: DeathPreventParams }
    | { type: 'buff_immunity'; params: BuffImmunityParams }
    | { type: 'damage_immunity'; params: DamageImmunityParams }
    | { type: 'skill_immunity'; params: SkillImmunityParams }
    | { type: 'skip_action'; params: SkipActionParams }
    | { type: 'queue_action'; params: QueueActionParams }
    | { type: 'resource_scaled_damage'; params: ResourceScaledDamageParams }
  );

// ===== Listener Contract =====

/**
 * owner
 */
export type ListenerScope =
  | 'owner_as_target' //  owner
  | 'owner_as_caster' //  owner
  | 'owner_as_actor' //  owner
  | 'global'; 


export type ListenerContextSource =
  'owner' | 'event.caster' | 'event.target' | 'event.source';


export interface ListenerContextMapping {
  caster: ListenerContextSource;
  target: ListenerContextSource;
}


export interface ListenerGuardConfig {
  /**
   *  owner  true
   */
  requireOwnerAlive?: boolean;
  /**
   *  DamageSegmentAppliedEvent
   */
  allowLethalWindow?: boolean;
  /**
   * damageSource === 'reflect'
   */
  skipReflectSource?: boolean;
  
  skipSecondaryDamageSource?: boolean;
}

export type ListenerTriggerGranularity =
  | 'segment'
  | 'hit'
  | 'cast'
  | 'action'
  | 'round'
  | 'battle'
  | 'buff_lifetime';

export interface ListenerTriggerPolicyConfig {
  maxTriggers: number;
  granularity: ListenerTriggerGranularity;
  group?: string;
}

/**
 *  ( Buff )
 */
export interface ListenerConfig {
  /**
   *  ID
   */
  id?: string;
  /**
   *  CombatEvent['type']
   * 'RoundPreEvent' | 'DamageSegmentAppliedEvent' | 'SkillCastEvent'
   */
  eventType: string;
  
  scope: ListenerScope;
  
  priority: number;
  
  mapping?: ListenerContextMapping;
  
  guard?: ListenerGuardConfig;
  /**  claim  */
  triggerPolicy?: ListenerTriggerPolicyConfig;
  
  conditions?: ConditionConfig[];
  
  effects: EffectConfig[];
}

export interface GlobalUniqueConfig {
  key: string;
  label?: string;
}

export interface AttributeModifierConfig {
  attrType: AttributeType;
  type: ModifierType;
  value: number;
  /**  Buff  */
  scaleByLayer?: boolean;
  /**  0  1  */
  valueByLayer?: readonly number[];
}

/**
 * BUFF  ()
 */
export interface BuffConfig {
  id: string;
  name: string;
  description?: string;
  type: BuffType;
  duration: number; // -1
  
  durationUnit?: 'owner_action' | 'round';
  /**  triggerPolicy/TriggerLedger */
  logVisibility?: 'player' | 'debug';
  
  statusVisibility?: 'player' | 'hidden';
  stackRule: StackRule;
  /**  ID  Buff  0 */
  stackPriority?: number;
  maxLayers?: number;
  /** one_layer  */
  dispelMode?: 'whole' | 'one_layer';
  /** protected  */
  dispelPolicy?: 'normal' | 'protected';
  /**  true */
  countsAsStatus?: boolean;
  
  removeOnDeath?: boolean;
  tags?: string[]; // Buff
  statusTags?: string[]; 
  /**
   *  ()
   */
  modifiers?: AttributeModifierConfig[];
  /**
   *  (EDA )
   */
  listeners?: ListenerConfig[];
}

/**
 *  ()
 */
export interface AbilityConfig {
  slug: string;
  name: string;
  description?: string;
  type: AbilityType;
  tags?: string[];

  /** Renderer-only metadata. Battle rules and effect resolution never read it. */
  presentation?: {
    visual: CombatVisualSpec;
    castPreset?: string;
    projectilePreset?: string;
    impactPreset?: string;
    cameraPreset?: string;
    audioKey?: string;
  };

  
  mpCost?: number;
  hpCost?: number;
  costs?: AbilityCostConfig[];
  cooldown?: number;
  priority?: number;

  
  targetPolicy?: {
    team: 'enemy' | 'ally' | 'self' | 'any';
    scope: 'single' | 'aoe' | 'random';
    maxTargets?: number;
  };
  
  hitPolicy?: 'normal' | 'guaranteed';

  selectionProfile?: AbilitySelectionProfile;
  castConditions?: ConditionConfig[];

  /**
   *  ()
   */
  effects?: EffectConfig[];

  /**  no-op  */
  completionEffects?: EffectConfig[];

  /**  effectPlans  */
  effectLayers?: AbilityEffectLayerConfig[];

  
  baseEffectDisplayName?: string;

  
  effectPlans?: AbilityEffectPlanConfig[];

  
  castEffects?: EffectConfig[];

  /**
   *  ()
   */
  listeners?: ListenerConfig[];

  
  modifiers?: AttributeModifierConfig[];
}
