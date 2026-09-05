import type { ActionStateView } from '../../core/actionState';
import type { AbilityCostConfig } from '../../core/configs';

// ===== Buff  =====
export interface BuffStateView {
  id: string;
  name: string;
  description?: string;
  type: 'buff' | 'debuff' | 'control';
  /**  player  */
  logVisibility?: 'player' | 'debug';
  
  statusVisibility?: 'player' | 'hidden';
  /** Buff  */
  sourceName?: string;
  layers: number;
  /** -1  */
  remaining: number;
  durationUnit: 'owner_action' | 'round';
  isPermanent: boolean;
}

// =====  =====
export interface CooldownStateView {
  skillId: string;
  skillName: string;
  
  isDefaultAttack?: boolean;
  
  runtimePlanId?: string;
  description?: string;
  /** 0 =  */
  current: number;
  
  max: number;
  
  mpCost: number;
  costs?: Array<AbilityCostConfig & { resolvedAmount: number }>;
}

// =====  =====
export interface AttrsStateView {
  
  attributeModelVersion?: 2;
  // strength/endurance
  vitality: number;
  strength?: number;
  spirit: number;
  endurance?: number;
  
  wisdom?: number;
  speed: number;
  willpower: number;
  //  0.35  35%
  atk: number;
  def: number;
  magicAtk: number;
  magicDef: number;
  
  actionSpeed: number;
  /**  0.35  35% */
  critRate: number;
  
  critDamageMult: number;
  
  evasionRate: number;
  
  controlHit: number;
  
  controlResistance: number;
  
  armorPenetration: number;
  magicPenetration: number;
  critResist: number;
  critDamageReduction: number;
  accuracy: number;
  healAmplify: number;
  
  
  maxHp: number;
  
  maxMp: number;
}

// =====  =====
export interface UnitStateSnapshot {
  id: string;
  name: string;
  alive: boolean;
  hp: { current: number; max: number; percent: number };
  mp: { current: number; max: number; percent: number };
  
  shield: number;
  attrs: AttrsStateView;
  baseAttrs: AttrsStateView;
  buffs: BuffStateView[];
  combatResources: Array<{
    id: string;
    name: string;
    icon?: string;
    current: number;
    max: number;
  }>;
  cooldowns: CooldownStateView[];
  
  actionStates?: ActionStateView[];
  
  canAct: boolean;
}

// ===== Delta=====

export interface UnitStateDelta {
  id: string;
  name: string;
  hp?: { from: number; to: number; change: number };
  mp?: { from: number; to: number; change: number };
  shield?: { from: number; to: number; change: number };
  
  attrs?: Partial<Record<keyof AttrsStateView, { from: number; to: number }>>;
  baseAttrs?: Partial<
    Record<keyof AttrsStateView, { from: number; to: number }>
  >;
  buffsAdded?: BuffStateView[];
  buffsRemoved?: Array<{ id: string; name: string }>;
  buffsUpdated?: Array<{
    id: string;
    name: string;
    /** == */
    layerChange?: number;
    /** == */
    remainingChange?: number;
  }>;
  combatResourcesChanged?: Array<{
    id: string;
    name: string;
    from: number;
    to: number;
  }>;
  cooldownsChanged?: Array<{
    skillId: string;
    skillName: string;
    from: number;
    to: number;
  }>;
  actionStatesChanged?: {
    from: ActionStateView[];
    to: ActionStateView[];
  };
  canActChanged?: { from: boolean; to: boolean };
  aliveChanged?: { from: boolean; to: boolean };
}

// =====  =====
export type StateFramePhase =
  'battle_init' | 'action_pre' | 'action_post' | 'round_post' | 'battle_end';

// =====  =====
export interface BattleStateFrame {
  /**  ID */
  frameId: number;
  turn: number;
  phase: StateFramePhase;
  /**  IDaction_pre / action_post */
  actorId?: string;
  /**
   *  V3  ID
   *  sequence
   */
  sourceSequenceId?: string;
  /** key = unitId */
  units: Record<string, UnitStateSnapshot>;
  /**
   *  deltakey = unitId
   *  unitId undefined
   */
  deltas?: Record<string, UnitStateDelta>;
}

// =====  =====
export interface BattleStateTimeline {
  frames: BattleStateFrame[];
  unitIds: string[];
  /** unitId → name  */
  unitNames: Record<string, string>;
}
