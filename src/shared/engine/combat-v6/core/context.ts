/**  HostUI */
import type { HookBus } from "./hooks.ts"
import type { SeededRng } from "./rng.ts"
import type {
  BattleEvent,
  BattleResult,
  BattleState,
  Ruleset,
  SkillDef,
  SkillId,
  StatusDef,
  StatusId,
  Unit,
  UnitId,
} from "./types.ts"

export type BattleContext = {
  state: BattleState
  rng: SeededRng
  rules: Ruleset
  skills: Map<SkillId, SkillDef>
  statusDefs: Map<StatusId, StatusDef>
  hooks: HookBus
  events: BattleEvent[]
  emit: (event: BattleEvent) => void
  applyHpZero: (unit: Unit, source?: Unit, skillId?: SkillId, kind?: import("./enums.ts").DamageKind, origin?: import("./enums.ts").DamageOrigin) => void
  checkEnd: (reason?: BattleResult["reason"]) => void
  /** >0  afterHit/onBeHit// */
  suppressHooks: number
  /** OnHitCalc / when.skillIds  */
  currentAction?: {
    triggeredTargets?: string[]
    normalTargetIds?: UnitId[]
    initialOwnedStatusKindsByTarget?: Record<UnitId, string[]>
    splashTargetIds?: Record<string, UnitId[]>
    initialSourceStatusIds?: string[]
    initialHpRatio?: number
    killedTargetIds?: UnitId[]
    skillId: SkillId
    sourceId: UnitId
    primaryTargetId?: UnitId
    targetIds: UnitId[]
    
    resourceGains: Record<string, number>
    
    hpRestoreGains: Record<string, number>
    impactDamageByTarget: Record<UnitId, number>
    hasPhysicalOrSpellImpact?: boolean
    initialStatusIdsByTarget: Record<UnitId, string[]>
    initialStatusKindsByTarget: Record<UnitId, string[]>
    /**  ActionFailed  successEffects */
    spellRepeatFactor?: number
    failed: boolean
  }
  
  lastStrikeDamage?: number
}
