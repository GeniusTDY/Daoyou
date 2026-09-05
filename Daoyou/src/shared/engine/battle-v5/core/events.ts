// engine/battle-v5/core/events.ts
/**
 *  - EDA
 *
 *  (EDA)
 * -
 * - /
 * -
 *
 *
 * AbilityCastStarted → HitResolved → DamageSegmentRequested
 *   → DamageSegmentApplied → HitSettled
 */
import { Ability } from '../abilities/Ability';
import { Buff } from '../buffs/Buff';
import { Unit } from '../units/Unit';
import type { TagPath } from '@shared/engine/shared/tag-domain';
import {
  CombatEvent,
  type DamageComponent,
  type DamageCalculationMode,
  type LogCauseRef,
  type TeamId,
  DamageSource,
  DamageType,
} from './types';
import type {
  ActionHitPolicy,
  ActionInterruptPolicy,
  ActionStateAbilityView,
  ActionStatePhase,
  ActionStateType,
} from './actionState';
import type { CombatResolutionContext } from './resolution';

/** Events in the new action/cast/hit/segment resolution model. */
export interface ResolutionEvent extends CombatEvent {
  readonly resolution: CombatResolutionContext;
}

export interface ActionStartedEvent extends ResolutionEvent {
  readonly type: 'ActionStartedEvent';
  readonly actor: Unit;
}

export interface AbilityCastStartedEvent extends ResolutionEvent {
  readonly type: 'AbilityCastStartedEvent';
  readonly caster: Unit;
  readonly target: Unit;
  readonly ability: Ability;
}

export interface HitResolvedEvent extends ResolutionEvent {
  readonly type: 'HitResolvedEvent';
  readonly caster: Unit;
  readonly target: Unit;
  readonly ability: Ability;
  readonly isHit: boolean;
  readonly isDodged: boolean;
  readonly isResisted: boolean;
}

export interface DamageSegmentRequestedEvent extends ResolutionEvent {
  readonly type: 'DamageSegmentRequestedEvent';
  readonly caster?: Unit;
  readonly target: Unit;
  readonly ability?: Ability;
  readonly buff?: Buff;
  readonly damageSource?: DamageSource;
  readonly damageType?: DamageType;
  readonly calculationMode?: DamageCalculationMode;
  readonly cause?: LogCauseRef;
  readonly damageTags?: string[];
  readonly damageComponents?: DamageComponent[];
  baseDamage: number;
  finalDamage: number;
  damageIncreasePctBucket?: number;
  damageReductionPctBucket?: number;
  forceCritical?: boolean;
  canCrit?: boolean;
  canLifesteal?: boolean;
  isCritical?: boolean;
  critMultiplier?: number;
}

export interface DamageSegmentAppliedEvent extends ResolutionEvent {
  readonly type: 'DamageSegmentAppliedEvent';
  readonly caster?: Unit;
  readonly target: Unit;
  readonly ability?: Ability;
  readonly buff?: Buff;
  readonly damageSource?: DamageSource;
  readonly damageType?: DamageType;
  readonly calculationMode?: DamageCalculationMode;
  readonly cause?: LogCauseRef;
  readonly damageTags?: string[];
  readonly finalDamage: number;
  readonly isCritical?: boolean;
  readonly critMultiplier?: number;
  readonly canLifesteal?: boolean;
  readonly damageTaken: number;
  readonly beforeHp: number;
  readonly remainHp: number;
  readonly shieldAbsorbed: number;
  readonly remainShield: number;
  readonly hpReachedZeroBeforeReactions: boolean;
  readonly reflectSourceName?: string;
}

export interface HitSettledEvent extends ResolutionEvent {
  readonly type: 'HitSettledEvent';
  readonly caster: Unit;
  readonly target: Unit;
  readonly ability: Ability;
  readonly segmentCount: number;
}

export interface AbilityCastSettledEvent extends ResolutionEvent {
  readonly type: 'AbilityCastSettledEvent';
  readonly caster: Unit;
  readonly target: Unit;
  readonly ability: Ability;
}

export interface ActionFinishedEvent extends ResolutionEvent {
  readonly type: 'ActionFinishedEvent';
  readonly actor: Unit;
}

// =====  =====

export enum EventPriorityLevel {
  ACTION_TRIGGER = 80, // 行动阶段触发（最高）
  SKILL_PRE_CAST = 75, // 施法前摇&打断判定
  SKILL_CAST = 70, // 技能正式释放
  HIT_CHECK = 65, // 命中判定
  DAMAGE_REQUEST = 60, // 伤害请求（增伤修正）
  DAMAGE_APPLY = 55, // 伤害应用（护盾/无敌响应）
  DAMAGE_TAKEN = 50, // 受击事件（触发被动/反伤）
  ROUND_POST_RECOVERY = 46, // 回合结束周期恢复
  ROUND_PRE = 45, // 回合前置结算（DOT、BUFF结算等）
  ROUND_POST_DRAIN = 44, // 回合结束周期损耗（DOT、资源扣除）
  BUFF_INTERCEPT = 40, // BUFF 拦截（高于 POST_SETTLE）
  TAG_CHANGE = 35, // 标签变更
  POST_SETTLE = 30, // 后置结算
  COMBAT_LOG = 10, // 战报输出（最低）
}

// =====  =====
export interface RoundPreEvent extends CombatEvent {
  type: 'RoundPreEvent';
  turn: number;
}

// =====  =====
export interface ActionPreEvent extends CombatEvent {
  type: 'ActionPreEvent';
  caster: Unit;
}

// ===== Buff =====
export interface ActionPostEvent extends CombatEvent {
  type: 'ActionPostEvent';
  caster: Unit;
}

// =====  =====
export interface SkillPreCastEvent extends CombatEvent {
  type: 'SkillPreCastEvent';
  caster: Unit;
  target: Unit;
  /** Sealed team-cast targets. Omitted for a single-target cast. */
  targets?: Unit[];
  fallbackTarget?: Unit;
  ability: Ability;
  isInterrupted: boolean;
  
  isImmune?: boolean;
  
  immunityReason?: string;
  interruptPolicy?: ActionInterruptPolicy;
  hitPolicy?: ActionHitPolicy;
  queuedActionState?: {
    name: string;
    sourceAbility?: ActionStateAbilityView;
  };
}

// =====  =====
export interface SkillInterruptEvent extends CombatEvent {
  type: 'SkillInterruptEvent';
  caster: Unit;
  target: Unit;
  ability: Ability;
  reason: string;
}

// =====  =====
export interface SkillCastEvent extends CombatEvent {
  type: 'SkillCastEvent';
  caster: Unit;
  target: Unit;
  ability: Ability;
  interruptPolicy?: ActionInterruptPolicy;
  hitPolicy?: ActionHitPolicy;
  //  DamageSystem
  isHit?: boolean; 
  isDodged?: boolean; 
  isResisted?: boolean; 
}

export interface AbilityCostPaidEvent extends CombatEvent {
  type: 'AbilityCostPaidEvent';
  caster: Unit;
  ability: Ability;
  beforeHp: number;
  afterHp: number;
  beforeMp: number;
  afterMp: number;
  hpPaid: number;
  mpPaid: number;
  beforeHpRatio: number;
  afterHpRatio: number;
}

export interface HpChangedEvent extends CombatEvent {
  type: 'HpChangedEvent';
  unit: Unit;
  beforeHp: number;
  afterHp: number;
  delta: number;
  reason: 'set' | 'damage' | 'heal' | 'ability_cost' | 'death_prevent' | 'initialization';
}

// =====  =====
export interface HitCheckEvent extends CombatEvent {
  type: 'HitCheckEvent';
  caster: Unit;
  target: Unit;
  ability: Ability;
  isHit: boolean;
  isDodged: boolean;
  isResisted: boolean;
  hitPolicy?: ActionHitPolicy;
}

export interface DodgeEvent extends CombatEvent {
  type: 'DodgeEvent';
  caster: Unit;
  target: Unit;
  ability: Ability;
}

export interface ControlResistEvent extends CombatEvent {
  type: 'ControlResistEvent';
  caster: Unit;
  target: Unit;
  ability?: Ability;
  buff: Buff;
}

// =====  =====
export interface ManaShieldAbsorbEvent extends CombatEvent {
  type: 'ManaShieldAbsorbEvent';
  caster?: Unit;
  target: Unit;
  ability?: Ability;
  buff?: Buff;
  absorbedDamage: number;
  mpConsumed: number;
  remainDamage: number;
}

// =====  =====
export interface DamageImmuneEvent extends CombatEvent {
  type: 'DamageImmuneEvent';
  caster?: Unit;
  target: Unit;
  ability?: Ability;
  buff?: Buff;
  blockedDamage: number;
  matchedTag: TagPath;
}

// =====  =====
export interface HealEvent extends CombatEvent {
  type: 'HealEvent';
  caster: Unit;
  target: Unit;
  ability?: Ability;
  buff?: Buff; //  Buff  HOT Buff
  healAmount: number;
  /**  healAmount */
  appliedAmount?: number;
  healType?: 'hp' | 'mp'; //  'hp'
}

// =====  =====
export interface ManaBurnEvent extends CombatEvent {
  type: 'ManaBurnEvent';
  caster: Unit;
  target: Unit;
  ability?: Ability;
  burnAmount: number;
}

// =====  =====
export interface ShieldEvent extends CombatEvent {
  type: 'ShieldEvent';
  caster: Unit;
  target: Unit;
  ability?: Ability;
  shieldAmount: number;
}

export interface ShieldBreakEvent extends CombatEvent {
  type: 'ShieldBreakEvent';
  caster?: Unit;
  target: Unit;
  ability?: Ability;
  buff?: Buff;
  brokenShieldAmount: number;
  overflowDamage: number;
  damageSource?: DamageSource;
}

// =====  =====
export interface CooldownModifyEvent extends CombatEvent {
  type: 'CooldownModifyEvent';
  caster: Unit;
  target: Unit;
  ability?: Ability;
  cdModifyValue: number;
  affectedAbilityName: string;
}

// =====  =====
export interface ResourceDrainEvent extends CombatEvent {
  type: 'ResourceDrainEvent';
  caster: Unit;
  target: Unit;
  ability?: Ability;
  drainType: 'hp' | 'mp';
  amount: number;
}

// =====  =====
export interface CombatResourceChangeEvent extends CombatEvent {
  type: 'CombatResourceChangeEvent';
  target: Unit;
  caster?: Unit;
  ability?: Ability;
  resourceId: string;
  resourceName: string;
  resourceMax: number;
  operation: 'add' | 'subtract' | 'set' | 'consume_all' | 'decay';
  reason?: 'gain' | 'spend' | 'refund' | 'decay';
  
  requested: number;
  
  applied: number;
  
  overflow: number;
  before: number;
  after: number;
}

// =====  =====
export interface DispelEvent extends CombatEvent {
  type: 'DispelEvent';
  caster: Unit;
  target: Unit;
  ability?: Ability;
  removedBuffNames: string[];
}

// =====  =====
export interface TagTriggerEvent extends CombatEvent {
  type: 'TagTriggerEvent';
  caster: Unit;
  target: Unit;
  ability?: Ability;
  displayName?: string;
  tag: string;
}

// =====  =====
export interface DeathPreventEvent extends CombatEvent {
  type: 'DeathPreventEvent';
  target: Unit;
  ability?: Ability;
  sourceKey?: string;
  sourceName?: string;
}

// =====  =====
export interface TagAddedEvent extends CombatEvent {
  type: 'TagAddedEvent';
  target: Unit;
  tag: TagPath;
  source?: unknown;
}

// =====  =====
export interface TagRemovedEvent extends CombatEvent {
  type: 'TagRemovedEvent';
  target: Unit;
  tag: TagPath;
  source?: unknown;
}

// ===== BUFF  =====
export interface BuffAddEvent extends CombatEvent {
  type: 'BuffAddEvent';
  target: Unit;
  buff: Buff;
  source?: Unit;
  isCancelled?: boolean;
  immuneTag?: TagPath;
}

// ===== BUFF  =====
export interface BuffAppliedEvent extends CombatEvent {
  type: 'BuffAppliedEvent';
  target: Unit;
  buff: Buff;
  source?: Unit | Ability | unknown; // /
  ability?: Ability;
  sourceBuff?: Buff;
}

export type BuffLayerChangeReason = 'apply' | 'stack' | 'effect' | 'dispel';

/** BuffContainer  */
export interface BuffLayerChangedEvent extends CombatEvent {
  type: 'BuffLayerChangedEvent';
  target: Unit;
  buff: Buff;
  source?: Unit;
  ability?: Ability;
  previousLayer: number;
  currentLayer: number;
  delta: number;
  reason: BuffLayerChangeReason;
  readonly resolution?: CombatResolutionContext;
}

// ===== BUFF  =====
export interface BuffRemovedEvent extends CombatEvent {
  type: 'BuffRemovedEvent';
  target: Unit;
  buff: Buff;
  reason: 'manual' | 'expired' | 'dispel' | 'replace'; 
}

// ===== BUFF  =====
export interface BuffImmuneEvent extends CombatEvent {
  type: 'BuffImmuneEvent';
  target: Unit;
  buff: Buff;
  immuneTag: TagPath; 
}

// =====  =====
export interface BattleInitEvent extends CombatEvent {
  type: 'BattleInitEvent';
  player: Unit;
  opponent: Unit;
  /** Complete roster for Team/Roster-aware listeners. */
  units?: Unit[];
}

// =====  =====
export interface RoundStartEvent extends CombatEvent {
  type: 'RoundStartEvent';
  turn: number;
}

// =====  =====
export interface TurnOrderEvent extends CombatEvent {
  type: 'TurnOrderEvent';
  turn: number;
  units: Unit[]; 
}

// =====  =====
export interface RoundPostEvent extends CombatEvent {
  type: 'RoundPostEvent';
  turn: number;
}

// =====  =====
export interface VictoryCheckEvent extends CombatEvent {
  type: 'VictoryCheckEvent';
  turn: number;
  battleEnded: boolean;
  winner: string | null;
}

// =====  =====
export interface BattleEndEvent extends CombatEvent {
  type: 'BattleEndEvent';
  /** Legacy winner unit id; the first surviving winner-team unit in team battles. */
  winner: string | null;
  winnerTeamId?: TeamId;
  turns: number;
}

// ===== =====
export interface ControlledSkipEvent extends CombatEvent {
  type: 'ControlledSkipEvent';
  unit: Unit;
  
  controlTag: string;
}

export interface ActionStateEvent extends CombatEvent {
  type: 'ActionStateEvent';
  unit: Unit;
  stateType: ActionStateType;
  phase: ActionStatePhase;
  name: string;
  remainingActions: number;
  sourceAbility?: ActionStateAbilityView;
  ability?: ActionStateAbilityView;
  reason?: string;
}
