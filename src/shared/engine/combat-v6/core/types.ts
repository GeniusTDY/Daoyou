/**
 *  enums.ts
 */
import type { AttrName } from './constants.ts';
import type {
  BattlePhase,
  CommandPolicy,
  DamageKind,
  DamageOrigin,
  FormulaFamily,
  HookAim,
  HookName,
  HpZeroOutcome,
  ResultReason,
  Side,
  SkillTag,
  StatusCategory,
  StatusFlag,
  TargetMode,
  TargetSide,
  UnitKind,
} from './enums.ts';
import {
  CommandType,
  CostHpFrom,
  EffectType,
  EventType,
  MatchWinner,
  StatusHit,
  StatusTick,
  TickKind,
} from './enums.ts';

export type { AttrName } from './constants.ts';
export type {
  BattlePhase,
  CommandPolicy,
  CommandType,
  CostHpFrom,
  DamageKind,
  DamageOrigin,
  EffectType,
  EventType,
  FormulaFamily,
  HookAim,
  HookName,
  HpZeroOutcome,
  ResultReason,
  Side,
  SkillTag,
  StatusCategory,
  StatusFlag,
  StatusHit,
  StatusTick,
  TargetMode,
  TargetSide,
  TickKind,
  UnitKind,
} from './enums.ts';

export type UnitId = string;
export type SkillId = string;
export type StatusId = string;

export type CombatResourceState = {
  id: string;
  name: string;
  current: number;
  /** null  */
  max: number | null;
};

export type BarrierState = {
  untilBattleEnd?: boolean;
  id: string;
  kind: string;
  name: string;
  current: number;
  remainingRounds: number;
  sourceId: UnitId;
  appliedRound: number;
};

/**  skillLevel / targets /  / floor min max */
export type Expr = number | string;

export type Attrs = { [K in AttrName]: number };

export type Command =
  | { type: typeof CommandType.Attack; target: UnitId }
  | { type: typeof CommandType.Skill; skillId: SkillId; targets: UnitId[] }
  | { type: typeof CommandType.Defend }
  | { type: typeof CommandType.Protect; target: UnitId }
  | { type: typeof CommandType.Item; itemId: string; target: UnitId }
  | { type: typeof CommandType.Summon; petId: string }
  | { type: typeof CommandType.Recall }
  | { type: typeof CommandType.Catch; target: UnitId }
  | { type: typeof CommandType.Flee }
  | { type: typeof CommandType.Auto };

export type BattleResult = {
  winner: Side | typeof MatchWinner.Draw;
  reason: ResultReason;
};


export type CombatV6VersionStamp = {
  /** Optional on archived battles predating the shared AUTO policy. */
  autoPolicyVersion?: string;
  engineVersion: 'combat-v6';
  rulesetVersion:
    | 'daoyou_rules_v1'
    | 'daoyou_rules_v2'
    | 'daoyou_rules_v3'
    | 'daoyou_rules_v4'
    | 'daoyou_rules_v5'
    | 'daoyou_rules_v6'
    | 'daoyou_rules_v7'
    | 'daoyou_rules_v8'
    | 'daoyou_rules_v9'
    | 'daoyou_rules_v10'
    | 'daoyou_rules_v11';
  contentVersion:
    | 'daoyou_wild_inventory_content_v1'
    | 'daoyou_wild_seeking_content_v2'
    | 'combat-v6-dungeon-v1'
    | 'combat-v6-tower-v1'
    | 'combat-v6-tower-v2'
    | 'combat-v6-tower-v3'
    | 'combat-v6-tower-v4'
    | 'combat-v6-tower-v5'
    | 'combat-v6-tower-v6'
    | 'combat-v6-tower-v7'
    | 'combat-v6-tower-v8'
    | 'combat-v6-ranking-v1'
    | 'combat-v6-sect-task-v1'
    | 'combat-v6-breakthrough-v1'
    | 'daoyou_wild_capture_content_v1'
    | 'daoyou_arena_beast_content_v1'
    | 'daoyou_training_beast_content_v1'
    | 'daoyou_wild_beast_content_v1'
    | 'daoyou_arena_content_v1'
    | 'empty_content_v1'
    | 'daoyou_sect_content_v1'
    | 'daoyou_sect_equipment_content_v1'
    | 'daoyou_sect_equipment_special_content_v1'
    | 'daoyou_character_build_content_v1'
    | 'daoyou_character_build_content_v2'
    | 'daoyou_character_build_content_v3'
    | 'daoyou_character_build_content_v4'
    | 'daoyou_character_build_content_v5'
    | 'daoyou_training_encounter_content_v1'
    | 'daoyou_wild_encounter_content_v1';
  projectionVersion:
    | 'arena_beast_v2'
    | 'training_beast_v2'
    | 'wild_beast_v2'
    | 'wild_individual_v3'
    | 'arena_beast_v1'
    | 'training_beast_v1'
    | 'wild_beast_v1'
    | 'arena_encounter_v1'
    | 'character_panel_v1'
    | 'character_training_v1'
    | 'character_sect_v1'
    | 'character_equipment_v1'
    | 'character_equipment_special_v1'
    | 'character_build_v1'
    | 'character_build_v2'
    | 'character_build_v3'
    | 'character_build_v4'
    | 'character_build_v5'
    | 'training_encounter_v1'
    | 'wild_encounter_v1';
};

/** kind  kind  */
export type StatusInstance = {
  snapshotModifiers?: CombatModifier[];
  id: StatusId;
  kind: string;
  remainingRounds: number;
  sourceId: UnitId;
  appliedRound: number;
  speedMod: number;
  attrMods: Partial<Attrs>;
  storedTargetId?: UnitId;
  
  transitionSkillLevel?: number;
  
  tickSkillLevel?: number;
  damageTakenPhysical: number;
  damageTakenSpell: number;
  healTaken: number;
  healDealt: number;
  stacks: number;
};

export type UnitFlags = {
  statusImmunityThroughRound?: Record<string, number>;
  capturedBy?: UnitId;
  reviveAtRound?: number;
  revivedRound?: number;
  defending: boolean;
  protecting?: UnitId;
  auto: boolean;
  
  skipNextAction: boolean;
  /**  hp<=0 */
  downed: boolean;
  /** /NPC hp<=0 */
  dead: boolean;
  escaped: boolean;
  
  benched: boolean;
};

export type Unit = {
  id: UnitId;
  name: string;
  side: Side;
  kind: UnitKind;
  slot: number;
  level: number;
  /**  id */
  ownerId?: UnitId;
  attrs: Attrs;
  /**  maxHp */
  wound: number;
  skills: SkillId[];
  passives: SkillId[];
  skillLevels: Record<SkillId, number>;
  /**  skillOf */
  skillOverrides: Record<SkillId, SkillDef>;
  /**  when.foeTags  id */
  tags: string[];
  combatFacts?: Record<string, number>;
  
  hpDamageThisRound?: { round: number; amount: number };
  skillUses?: Record<string, number>;
  cooldowns?: Record<string, number>;
  resources: CombatResourceState[];
  barriers: BarrierState[];
  /** / */
  marks: string[];
  statuses: StatusInstance[];
  flags: UnitFlags;
  command?: Command;
  lastCommand?: Command;
  lastTargetId?: UnitId;
};

/** rngState  */
export type BattleState = {
  round: number;
  phase: BattlePhase;
  units: Unit[];
  result?: BattleResult;
  rngState: number;
  versions: CombatV6VersionStamp;
};

export type CombatV6SkillCommandOption = {
  cooldownRemaining?: number;
  skillId: SkillId;
  name: string;
  costs: {
    mp: number;
    hp: number;
    resources: Array<{ resourceId: string; amount: number }>;
  };
  ready: boolean;
  reasons: string[];
  selectableTargetIds: UnitId[];
  targetMode: TargetMode;
  targetCount: number;
};

export type CombatV6CommandOptions = {
  unitId: UnitId;
  canSubmit: boolean;
  reasons: string[];
  attackTargetIds: UnitId[];
  protectTargetIds: UnitId[];
  canDefend: boolean;
  canFlee: boolean;
  summonablePets?: Array<{
    id: string;
    name: string;
    hp: number;
    maxHp: number;
    mp: number;
    maxMp: number;
  }>;
  canRecall?: boolean;
  skills: CombatV6SkillCommandOption[];
};

export type LineupUnit = {
  id?: UnitId;
  name: string;
  side: Side;
  kind: UnitKind;
  slot?: number;
  level?: number;
  ownerId?: UnitId;
  benched?: boolean;
  attrs: Partial<Attrs> & {
    hp: number;
    speed: number;
    physicalAtk: number;
    physicalDef: number;
  };
  skills?: SkillId[];
  passives?: SkillId[];
  skillLevels?: Record<SkillId, number>;
  /**  id  */
  skillOverrides?: SkillDef[];
  tags?: string[];
  combatFacts?: Record<string, number>;
  resources?: CombatResourceState[];
};

export type SkillTargeting = {
  /** Maximum manually selected targets; fill chooses the remainder. */
  maxSelected?: number;
  excludeSelf?: boolean;
  includeOwnedStatusKind?: string;
  side: TargetSide;
  requireKind?: UnitKind;
  /** explicit=fill=all/random/lowestHp/lowestDef  */
  mode?: TargetMode;
  count?: Expr;
  
  countByResource?: Array<{ resourceId: string; min: number; count: Expr }>;
  /**  count  extraCount */
  extraChance?: Expr;
  extraCount?: Expr;
  
  includeDowned?: boolean;
  onlyDowned?: boolean;
  requireRevivable?: boolean;
  includeDead?: boolean;
  requireStatusIds?: StatusId[];
  requireStatusKinds?: string[];
};

/** / */
export type EffectWhen = {
  expression?: Expr;
  targetDowned?: boolean;
  targetDead?: boolean;
  excludeFoeKinds?: UnitKind[];
  targetOwnedStatus?: { kind: string; appliedThisRound?: boolean };
  enemyStatusCount?: { kind: string; min: number };
  removedStatusKind?: string;
  statusRemoveReason?: string;
  originalResourceCostMax?: number;
  oncePerActionTarget?: boolean;
  pvp?: boolean;
  teamUniqueTag?: string;
  targetEnemy?: boolean;
  targetHasStandingPet?: boolean;
  actionSucceeded?: boolean;
  actionKilledTarget?: boolean;
  sourceInitialHpRatioMin?: number;
  excludeSkillTags?: SkillTag[];
  excludePercentageDamage?: boolean;
  sourceMpRatioBelow?: number;
  sourceMpRatioAbove?: number;
  sourceHasBarrier?: boolean;
  targetHasBarrier?: boolean;
  sourceStatusCategories?: StatusCategory[];
  sourceRemovableControl?: boolean;
  skillIds?: SkillId[];
  skillTags?: SkillTag[];
  requireStatusIds?: StatusId[];
  requireStatusKinds?: string[];
  requireAbsentStatusIds?: StatusId[];
  requireAbsentStatusKinds?: string[];
  targetWithoutDelayedRevival?: boolean;
  targetSkillIds?: SkillId[];
  targetAbsentSkillIds?: SkillId[];
  targetStatusIds?: StatusId[];
  targetStatusKinds?: string[];
  targetAbsentStatusIds?: StatusId[];
  targetAbsentStatusKinds?: string[];
  targetStatusCategories?: StatusCategory[];
  targetAbsentStatusCategories?: StatusCategory[];
  targetStatusStack?: {
    statusId?: StatusId;
    kind?: string;
    min?: number;
    max?: number;
  };
  initialTargetStatusKinds?: string[];
  initialTargetOwnedStatus?: string;
  sourceInitialStatusIds?: StatusId[];
  primaryTargetStatusIds?: StatusId[];
  primaryTargetStatusKinds?: string[];
  sourceHpRatioBelow?: number;
  sourceHpRatioAbove?: number;
  targetHpRatioBelow?: number;
  targetHpRatioAbove?: number;
  /** primary= */
  targetSlot?: 'primary' | 'secondary' | 'all' | 'normal';
  foeKind?: UnitKind;
  foeTags?: string[];
  sourceTags?: string[];
  oncePerBattle?: boolean;
  oncePerRound?: boolean;
  requireKind?: DamageKind;
  sourceResource?: { id: string; min?: number; max?: number };
  sourceDefending?: boolean;
  damageOrigins?: DamageOrigin[];
  sourceStanding?: boolean;
};

type EffectCore =
  | { type: typeof EffectType.Repeat; min: number; max: number; effects: SkillEffect[] }
  | { type: typeof EffectType.ModifyFact; key: string; value: Expr }
  | { type: typeof EffectType.ModifyStatusDuration; kinds?: string[]; categories?: StatusCategory[]; maxCount?: number; random?: boolean; amount: Expr; ownedOnly?: boolean }
  | {
      type: typeof EffectType.RandomBranch;
      branchId: string;
      chance: Expr;
      successEffects: SkillEffect[];
      failureEffects: SkillEffect[];
    }
  | {
      type: typeof EffectType.PhysicalHit;
      hits?: Expr;
      coeff?: number | number[];
      /** Multiplies the resolved damage, rather than the attack formula. */
      resultFactors?: number[];
      power?: Expr;
      trueDamage?: boolean;
      formula?: FormulaFamily;
      defenseIgnore?: Expr;
      mpDamageRatio?: number;
      cannotMiss?: boolean;
      cannotKill?: boolean;
    }
  | {
      type: typeof EffectType.SpellHit;
      hits?: Expr;
      coeff?: number | number[];
      /** Multiplies the resolved damage, rather than the attack formula. */
      resultFactors?: number[];
      power?: Expr;
      trueDamage?: boolean;
      formula?: FormulaFamily;
      defenseIgnore?: Expr;
      cannotKill?: boolean;
    }
  | {
      type: typeof EffectType.FixedHit;
      /** Damage based on the target's current/maximum HP, not an ordinary attack. */
      percentageDamage?: boolean;
      hits?: Expr;
      coeff?: number | number[];
      /** Multiplies the resolved damage, rather than the attack formula. */
      resultFactors?: number[];
      power?: Expr;
      formula?: FormulaFamily;
      origin?: DamageOrigin;
      cannotKill?: boolean;
    }
  | { type: typeof EffectType.Heal; power: Expr; healMaxHp?: boolean; fixedBase?: boolean; includeHealPower?: boolean }
  | {
      type: typeof EffectType.RestoreHp;
      power: Expr;
      maxGainPerAction?: Expr;
      revive?: boolean;
      allowFatal?: boolean;
      clearStatuses?: boolean;
    }
  | { type: typeof EffectType.RestoreMp; power: Expr }
  | { type: typeof EffectType.Revive; hp?: Expr; hpRatio?: Expr; respectHealTaken?: boolean }
  | {
      type: typeof EffectType.ApplyStatus;
      statusId: StatusId;
      duration: Expr;
      self?: boolean;
      storeTarget?: boolean;
      /**  sealHitChance */
      hit?: StatusHit;
    }
  | {
      type: typeof EffectType.RemoveStatus;
      statusIds?: StatusId[];
      kinds?: string[];
      maxCount?: Expr;
      ownedOnly?: boolean;
    }
  | {
      type: typeof EffectType.CopyStatus;
      statusIds?: StatusId[];
      kinds?: string[];
      maxCount?: Expr;
      durationAdd?: Expr;
    }
  | { type: typeof EffectType.EmitMechanic; mechanicId: string; name: string }
  | {
      type: typeof EffectType.Dispel;
      kinds?: string[];
      statusIds?: StatusId[];
      categories?: StatusCategory[];
      maxCount?: Expr;
      categoryPriority?: StatusCategory[];
      random?: boolean;
      chance?: number;
      chanceByClass?: Record<string, number>;
      includeStatusFlags?: StatusFlag[];
      excludeStatusFlags?: StatusFlag[];
      
      schoolOnly?: boolean;
      preventReapplyThisRound?: boolean;
      immunityRounds?: number;
    }
  | { type: typeof EffectType.SkipNextAction }
  | { type: typeof EffectType.DamageMp; power?: Expr }
  | { type: typeof EffectType.Wound; power?: Expr }
  | { type: typeof EffectType.RemoveWound; power: Expr }
  | {
      type: typeof EffectType.ApplyBarrier;
      untilBattleEnd?: boolean;
      id: string;
      kind: string;
      name: string;
      power: Expr;
      duration: Expr;
    }
  | { type: typeof EffectType.ModifyStrike; factor?: Expr; add?: Expr }
  | { type: typeof EffectType.ModifyDefenseIgnore; factor?: Expr; add?: Expr }
  | { type: typeof EffectType.ModifyHeal; factor?: Expr; add?: Expr }
  | { type: typeof EffectType.ModifyBarrier; factor?: Expr; add?: Expr }
  | { type: typeof EffectType.ModifyWound; factor?: Expr; add?: Expr }
  | { type: typeof EffectType.SetCrit }
  | {
      type: typeof EffectType.ModifyResource;
      resourceId: string;
      amount: Expr;
      mode?: 'add' | 'set';
      
      maxGainPerAction?: Expr;
      affectTarget?: boolean;
    }
  | { type: typeof EffectType.ModifyChance; add?: Expr; factor?: Expr }
  | { type: typeof EffectType.ModifyCooldown; skillId: string; amount: Expr }
  | { type: typeof EffectType.LoseHp; power: Expr }
  | { type: typeof EffectType.ClearSkipNextAction };

export type SkillEffect = EffectCore & {
  when?: EffectWhen;
  targeting?: SkillTargeting;
};
export type RandomBranchEffect = Extract<
  SkillEffect,
  { type: typeof EffectType.RandomBranch }
>;

export type SkillHook = {
  on: HookName;
  /** Damage returned to an attacker; may be suppressed by its innate capability. */
  retaliation?: boolean;
  /** First-hit guard, bypassed by an attacker with ignoreParry. */
  parry?: boolean;
  chance?: Expr;
  when?: EffectWhen;
  targetIsSelf?: boolean;
  sourceIsSelf?: boolean;
  sourceIsOwnedPet?: boolean;
  requireKind?: DamageKind;
  /** hookSource=/hookTarget=others= */
  aim?: HookAim;
  /** Explicit hook target selection; takes precedence over aim. */
  targeting?: SkillTargeting;
  aimCount?: Expr;
  aimMode?: TargetMode;
  /** onAttempt  */
  limitConsumption?: 'onSuccess' | 'onAttempt';
  effects: SkillEffect[];
};

/**  N²·quad + N·linear + intercept rules */
export type SchoolTerm = {
  quad?: number;
  linear?: number;
  intercept?: number;
};

/** 1 - ×perTarget floor */
export type SplashSpec = {
  perTarget: number;
  floor: number;
};

/**  effects hooks id */
/**  ID */
export type CombatModifier = {
  /** Extra barrier destruction; never amplifies damage to HP. */
  barrierDamageBonus?: Expr;
  /** Applied once before barriers, including periodic and derived damage. */
  allDamageTakenBonus?: Expr;
  hitAdd?: Expr;
  when?: EffectWhen;
  
  teamAura?: string;
  sealChanceFactor?: Expr;
  sealChanceAdd?: Expr;
  statusDurationAdd?: { statusId: string; amount: Expr };
  ignoreSealStatusKinds?: string[];
  bypassImmunity?: { statusKinds: string[]; passiveIds: string[] };
  damageTakenAdd?: Expr;
  damageTakenBonus?: Expr;
  physicalFuryChanceAdd?: Expr;
  sealResistanceAdd?: Expr;
  damageBonus?: Expr;
  damageAdd?: Expr;
  physicalAttackAdd?: Expr;
  critChanceAdd?: Expr;
  critMultiplierAdd?: Expr;
  defenseIgnoreAdd?: Expr;
  protectedDamageBonus?: Expr;
  ignoreProtection?: boolean;
  splash?: { factor: number; count: Expr };
  mirrorToTargetPet?: boolean;
  recoverySkipChance?: Expr;
  waiveHpCostAndRequirement?: boolean;
  hpRequirement?: { min: number };
  targetCountAdd?: Expr;
  physicalHitsAdd?: number;
  resetCooldownOnKill?: boolean;
  ignoreReviveBlock?: boolean;
};

export type SkillDef = {
  requirement?: Expr;
  modifiers?: CombatModifier[];
  cooldownRounds?: number;
  initialCooldownRounds?: number;
  recoveryStatusId?: string;
  
  originalResourceCosts?: Array<{ resourceId: string; amount: Expr }>;
  /** Host freezes eligible targets/capacity; normal skill targeting and payment still apply. */
  capture?: {
    targetMpCosts: Record<UnitId, number>;
    capacity: number;
    chance: Expr;
  };
  id: SkillId;
  name: string;
  school?: string;
  costMp?: Expr;
  costHp?: Expr;
  costHpFrom?: CostHpFrom;
  requireHpRatio?: number;
  requireHpAboveRatio?: number;
  requireHpBelowRatio?: number;
  forbidRevivedRound?: boolean;
  description?: string;
  successCostHp?: Expr;
  successCostMp?: Expr;
  resourceRequirements?: Array<{ resourceId: string; min: number }>;
  resourceCosts?: Array<{ resourceId: string; amount: Expr }>;
  tags: SkillTag[];
  /**  rules  */
  formula?: FormulaFamily;
  /**  power +  */
  schoolTerm?: SchoolTerm;
  /**  1 */
  splash?: SplashSpec;
  /**  55 rules  sealChanceBase  */
  sealBase?: number;
  targeting: SkillTargeting;
  /**  targeting  costMp
   *
   */
  preparation?: { effects: SkillEffect[]; targetCount: Expr };
  effects: SkillEffect[];
  /**  ActionFailed  no-op  */
  successEffects?: SkillEffect[];
  hooks?: SkillHook[];
  /**  vs  */
  conflicts?: SkillId[];
  
  innate?: { negativeSpellResistance?: number; sealHitTakenFactor?: number; delayedRevivalRounds?: number; preventDelayedRevival?: boolean; rejectHpRecovery?: boolean; rejectBuffs?: boolean; damageToDelayedRevival?: number; damageFromDelayedRevival?: number; immuneStatusCategories?: StatusCategory[]; immuneStatusKinds?: string[]; buffDuration?: { factor: number; maxExtra: number }; entryStatus?: { statusId: string; minDuration: number; maxDuration: number }; revealStealth?: boolean; mpCostWaiverChance?: number; mpCostFactor?: number; spellMpCostFactor?: number; suppressSpellRetaliation?: boolean; spellRepeat?: { chance: number; factor: number }; spellFluctuation?: { min: number; max: number }; suppressPhysicalRetaliation?: boolean; ignoreParry?: boolean };
};


export type StatusDef = {
  /** Command restrictions also apply to preflight/UI; resting is not a seal. */
  blockedCommands?: CommandType[];
  blocksNonArtSkills?: boolean;
  blocksArts?: boolean;
  protectsTarget?: boolean;
  snapshotModifiers?: boolean;
  modifiers?: CombatModifier[];
  school?: string;
  
  sealHitTakenFactor?: number;
  
  upkeepMp?: { self: number; other: number };
  sourceBound?: boolean;
  damageTakenFromSource?: number;
  immuneToSeal?: boolean;
  physicalDefenseIgnore?: number;
  
  onExpire?: { statusId: StatusId; duration: number };
  id: StatusId;
  name: string;
  kind: string;
  category?: StatusCategory;
  blocksAction?: boolean;
  blocksSpell?: boolean;
  blocksPhysical?: boolean;
  blocksRevive?: boolean;
  
  persistWhenDowned?: boolean;
  
  persistWhenBenched?: boolean;
  untargetable?: boolean;
  revealStealth?: boolean;
  actFirst?: boolean;
  breakOnDamage?: boolean;
  commandPolicy?: CommandPolicy;
  speedMod?: Expr;
  attrMods?: Partial<Record<AttrName, Expr>>;
  damageTakenPhysical?: number;
  damageTakenSpell?: number;
  ticks?: StatusTick;
  /** Round-end healing uses the ordinary outgoing/incoming healing pipeline. */
  healingPerRound?: Expr;
  /** Consumed after physical/spell action damage, including barriers; fixed damage is excluded. */
  consumeAfterDamagingAction?: boolean;
  onTick?: { type: TickKind; ratioOfMaxHp: number; ratioOfMaxMp?: number; hpCap?: Expr; mpCap?: Expr };
  
  expireSameRound?: boolean;
  /**  keep toCaster  */
  redirectTaken?: { keep: number; toCaster: number };
  /** 1=/ */
  healTaken?: number;
  /** 1= */
  healDealt?: number;
  /** >1  kind  */
  maxStacks?: number;
  /** false  Dispel  */
  dispellable?: boolean;
  dispelClass?: string;
  extendable?: boolean;
  /** Same-kind statuses retain the strongest priority; equal strength retains the longer duration. */
  priority?: number;
  untilBattleEnd?: boolean;
  damageDealtPhysical?: number;
  damageDealtSpell?: number;
};

export type ActionScope = {
  skillId: SkillId;
  sourceId: UnitId;
  primaryTargetId?: UnitId;
  targetIds: UnitId[];
};

export type StrikeFormulaInput = {
  family: FormulaFamily | (string & {});
  kind: DamageKind;
  source: Unit;
  target: Unit;
  coeff: number;
  power: number;
  fury: boolean;
  furyMultiplier?: number;
  skillLevel?: number;
  
  targetCount?: number;
  schoolTerm?: SchoolTerm;
  splash?: SplashSpec;
  defenseIgnore?: number;
};

export type FormulaSet = {
  fluctuationMin: number;
  fluctuationMax: number;
  /**  fluctuationMin  */
  physicalFluctuationMin: number;
  physicalFluctuationMax: number;
  critMultiplier: number;
  furyAtkMultiplier: number;
  defendPhysicalFactor: number;
  physicalBase(atk: number, def: number): number;
  spellBase(magicAtk: number, magicDef: number, power: number): number;
  /**  family  family  physical/spell */
  baseDamage(input: StrikeFormulaInput): number;
  physicalHitChance(source: Unit, target: Unit): number;
  spellHitChance(source: Unit, target: Unit): number;
  /** Final seal chance ceiling after skill and target multipliers; defaults to 1. */
  sealChanceCeil?: number;
  sealHitChance(
    source: Unit,
    target: Unit,
    skillLevel?: number,
    sealBase?: number,
    additiveChance?: number,
  ): number;
  fleeChance(unit: Unit, enemies: Unit[]): number;
};

export type DecideCommandInput = {
  unit: Unit;
  state: BattleState;
  enemies: Unit[];
  allies: Unit[];
};


export type Ruleset = {
  protectionTargetRatio?: number;
  name: string;
  /** Intent can be submitted before a player is revived or regains resources. */
  deferredPlayerCommands?: boolean;
  maxRounds: number;
  formulas: FormulaSet;
  hpZeroOutcome(unit: Unit): HpZeroOutcome;
  decideCommand(input: DecideCommandInput): Command;
};

export type BattleEvent =
  | {
      type: typeof EventType.BattleStart;
      seed: number;
      unitIds: UnitId[];
      versions: CombatV6VersionStamp;
    }
  | { type: typeof EventType.RoundStart; round: number }
  | { type: typeof EventType.CommandAccepted; unitId: UnitId; command: Command }
  | {
      type: typeof EventType.CommandDefaulted;
      unitId: UnitId;
      command: Command;
    }
  | { type: typeof EventType.TurnOrder; unitIds: UnitId[] }
  | { type: typeof EventType.ActionSkip; unitId: UnitId; reason: string }
  | { type: typeof EventType.ActionStart; unitId: UnitId; command: Command }
  | {
      type: typeof EventType.Retarget;
      unitId: UnitId;
      from: UnitId;
      to: UnitId;
    }
  | {
      type: typeof EventType.Miss;
      sourceId: UnitId;
      targetId: UnitId;
      kind: DamageKind | typeof StatusHit.Seal;
    }
  | {
      type: typeof EventType.Hit;
      sourceId: UnitId;
      targetId: UnitId;
      kind: DamageKind;
      crit: boolean;
      fury: boolean;
    }
  | {
      type: typeof EventType.ProtectTrigger;
      protectorId: UnitId;
      originalTargetId: UnitId;
    }
  | {
      type: typeof EventType.Damage;
      sourceId: UnitId;
      targetId: UnitId;
      amount: number;
      hpAfter: number;
      kind: DamageKind;
    }
  | {
      type: typeof EventType.Heal;
      sourceId: UnitId;
      targetId: UnitId;
      amount: number;
      hpAfter: number;
    }
  | {
      type: typeof EventType.MpCost;
      unitId: UnitId;
      amount: number;
      mpAfter: number;
    }
  | {
      type: typeof EventType.HpCost;
      unitId: UnitId;
      amount: number;
      hpAfter: number;
    }
  | {
      type: typeof EventType.MpDamage;
      sourceId: UnitId;
      targetId: UnitId;
      amount: number;
      mpAfter: number;
    }
  | {
      type: typeof EventType.Wound;
      sourceId: UnitId;
      targetId: UnitId;
      amount: number;
      maxHpAfter: number;
    }
  | {
      type: typeof EventType.WoundChanged;
      sourceId: UnitId;
      targetId: UnitId;
      before: number;
      after: number;
      hpAfter: number;
      recoverableHpAfter: number;
    }
  | {
      type: typeof EventType.BarrierChanged;
      sourceId: UnitId;
      unitId: UnitId;
      barrierId: string;
      before: number;
      after: number;
      reason: 'applied' | 'refreshed' | 'absorbed' | 'expired' | 'downed';
    }
  | {
      type: typeof EventType.StatusApplied;
      unitId: UnitId;
      statusId: StatusId;
      duration: number;
    }
  | {
      type: typeof EventType.StatusRemoved;
      unitId: UnitId;
      statusId: StatusId;
      reason: string;
    }
  | {
      type: typeof EventType.MechanicTriggered;
      mechanicId: string;
      name: string;
      sourceId: UnitId;
      targetId?: UnitId;
    }
  | {
      type: typeof EventType.ChanceResolved;
      branchId: string;
      sourceId: UnitId;
      targetId?: UnitId;
      chance: number;
      success: boolean;
    }
  | { type: typeof EventType.UnitDowned; unitId: UnitId }
  | { type: typeof EventType.UnitDead; unitId: UnitId }
  | { type: typeof EventType.UnitRevived; unitId: UnitId; hp: number }
  | { type: typeof EventType.UnitEscaped; unitId: UnitId }
  | { type: typeof EventType.PetSummoned; unitId: UnitId; petId: UnitId }
  | { type: typeof EventType.PetRecalled; unitId: UnitId; petId: UnitId }
  | {
      type: typeof EventType.UnitCaptured;
      unitId: UnitId;
      targetId: UnitId;
      generationSeed: number;
    }
  | {
      type: typeof EventType.MpRestore;
      unitId: UnitId;
      amount: number;
      mpAfter: number;
    }
  | {
      type: typeof EventType.ResourceChanged;
      sourceId: UnitId;
      unitId: UnitId;
      resourceId: string;
      before: number;
      after: number;
    }
  | { type: typeof EventType.ActionFailed; unitId: UnitId; reason: string }
  | { type: typeof EventType.RoundEnd; round: number }
  | {
      type: typeof EventType.BattleEnd;
      winner: BattleResult['winner'];
      reason: BattleResult['reason'];
    };

export type CreateBattleInput = {
  seed: number;
  versions: CombatV6VersionStamp;
  units: LineupUnit[];
  ruleset: Ruleset;
  skills?: SkillDef[];
  statusDefs?: StatusDef[];
};

export type ExprEnv = {
  normalTargetIds?: string[];
  killedTargetIds?: string[];
  state?: Pick<BattleState, "round" | "units">;
  skillLevel: number;
  targets: number;
  source: Unit;
  target?: Unit;
  damage?: number;
  
  hpDamage?: number;
  impactDamage?: number;
  targetStatusStacks?: number;
  originalResourceCost?: number;
};
