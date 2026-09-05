// =====  =====
export type UnitId = string;
export type TeamId = string;
export type TeamSlot = 0 | 1 | 2 | 3;
export type AbilityId = string;
export type BuffId = string;
export type EventPriority = number;

import type { CombatOriginV3, CombatTraceV3 } from '../v3/types';
import type { CombatResolutionContext } from './resolution';

// =====  =====
export interface CombatEvent {
  readonly type: string;
  readonly timestamp: number;
  readonly trace?: CombatTraceV3;
  readonly origin?: CombatOriginV3;
  /** Action/cast/hit identity; distinct from causal trace identity. */
  readonly resolution?: CombatResolutionContext;
}

// =====  =====
export enum AttributeType {
  // ── ──
  VITALITY = 'vitality', // 体魄：气血上限、少量法术防御
  STRENGTH = 'strength', // 力道：物理攻击
  SPIRIT = 'spirit', // 灵力：法术攻击、少量法力
  ENDURANCE = 'endurance', // 根骨：物理防御、少量气血上限
  SPEED = 'speed', // 身法：行动速度、闪避率、命中
  WILLPOWER = 'willpower', // 神识：法防、法力、控制命中与抗性

  // ── base modifier ──
  ATK = 'atk', // 物理攻击：40 + STRENGTH×3.5
  DEF = 'def', // 物理防御：10 + ENDURANCE×1.75
  MAGIC_ATK = 'magicAtk', // 法术攻击：40 + SPIRIT×3.5
  MAGIC_DEF = 'magicDef', // 法术防御：10 + WILLPOWER×1.75 + VITALITY×0.25
  ACTION_SPEED = 'actionSpeed', // 行动速度：SPEED
  CRIT_RATE = 'critRate', // 暴击率：基础 5%，外部构筑注入
  CRIT_DAMAGE_MULT = 'critDamageMult', // 暴击伤害倍率：基础 1.5
  EVASION_RATE = 'evasionRate', // 闪避率：0.02 + curve(SPEED, 240, 0.24)
  ACCURACY = 'accuracy', // 命中：0.05 + curve(SPEED, 240, 0.27)
  CONTROL_HIT = 'controlHit', // 控制命中：0.04 + curve(WILLPOWER, 240, 0.30)
  CONTROL_RESISTANCE = 'controlResistance', // 控制抗性：0.04 + curve(WILLPOWER, 240, 0.34)
  MAX_HP = 'maxHp', // 最大气血：400 + VITALITY×20 + ENDURANCE×3
  MAX_MP = 'maxMp', // 最大法力：200 + SPIRIT×4 + WILLPOWER×10

  // ── base=0/Buff/──
  ARMOR_PENETRATION = 'armorPenetration', // 破防：抵消目标减伤率 (0~1)
  MAGIC_PENETRATION = 'magicPenetration', // 法术穿透：削减目标法防 (0~1)
  CRIT_RESIST = 'critResist', // 暴击韧性：降低对手暴击率 (0~1)
  CRIT_DAMAGE_REDUCTION = 'critDamageReduction', // 暴击减伤：降低受到暴击倍率 (0~0.5)
  HEAL_AMPLIFY = 'healAmplify', // 治疗增强 (≥0)
  HEAL_RECEIVED_REDUCTION = 'healReceivedReduction', // 受到的气血治疗削弱 (0~1)
}

// ===== 6=====
export enum ModifierType {
  BASE = 'base',
  FIXED = 'fixed',
  ADD = 'add',
  /**
   *  MULTIPLY modifier  value  value
   *
   *  AttributeSet.getFinalValue
   *   `final *= modifiers.filter(MULTIPLY).reduce((p, m) => p * m.value, 1)`
   *
   *
   * - value = 1.5 →  50%×1.5
   * - value = 0.7 →  30%×0.7
   *
   *  ADD ADD `final *= 1 + sum`MULTIPLY
   */
  MULTIPLY = 'multiply',
  FINAL = 'final',
  OVERRIDE = 'override',
}

export interface AttributeModifier<TSource = unknown> {
  readonly id: string;
  readonly attrType: AttributeType;
  readonly type: ModifierType;
  readonly value: number;
  readonly source: TSource;
}

// =====  =====
export enum AbilityType {
  ACTIVE_SKILL = 'active_skill',
  PASSIVE_SKILL = 'passive_skill',
  DESTINY = 'destiny',
}

// =====  =====
export enum EffectType {
  DAMAGE = 'damage',
  HEAL = 'heal',
  SHIELD = 'shield',
  ADD_BUFF = 'add_buff',
  REMOVE_BUFF = 'remove_buff',
  STAT_MODIFIER = 'stat_modifier',
}

// =====  =====
export enum DamageType {
  PHYSICAL = 'physical',
  MAGICAL = 'magical',
  TRUE = 'true',
  DOT = 'dot',
}

// =====  =====
export enum DamageSource {
  DIRECT = 'direct',
  REFLECT = 'reflect',
  COUNTER = 'counter',
  FOLLOW_UP = 'follow_up',
  DELAYED = 'delayed',
}

/**
 *
 * source cause
 */
export interface LogCauseRef {
  kind: 'ability' | 'buff' | 'mechanic';
  id: string;
  displayName: string;
}

export type DamageCalculationMode = 'standard' | 'resolved_final';

export type DamageMitigationMode = 'normal' | 'bypass_defense';

export interface DamageComponent {
  readonly kind: string;
  readonly amount: number;
  readonly mitigation: DamageMitigationMode;
  /**  attackBase  segmentMultiplier */
  readonly attackBase?: number;
  
  readonly segmentMultiplier?: number;
}

// ===== BUFF =====
export enum BuffType {
  BUFF = 'buff',
  DEBUFF = 'debuff',
  CONTROL = 'control',
}

// =====  =====
export interface AbilitySnapshot {
  id: string;
  name: string;
  currentCd: number;
  maxCd: number;
  mpCost: number;
  type: AbilityType;
}

export interface UnitSnapshot {
  unitId: UnitId;
  name: string;
  attributes: Record<AttributeType, number>;
  currentHp: number;
  maxHp: number;
  currentMp: number;
  maxMp: number;
  buffs: BuffId[];
  combatResources: Array<{
    id: string;
    name: string;
    icon?: string;
    current: number;
    max: number;
  }>;
  isAlive: boolean;
  hpPercent: number;
  mpPercent: number;
  currentShield: number;
  abilities: AbilitySnapshot[];
  baseAttributes: Record<AttributeType, number>;
}


export * from './events';
