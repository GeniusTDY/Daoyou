/**
 *  bindDataHooks
 * cancelled / damage
 */
import type { DamageKind, DamageOrigin, HookName } from "./enums.ts"
import type { BattleEvent, SkillId, Unit } from "./types.ts"

export type { HookName }

export type HookContext = {
  removedStatusKind?: string
  statusRemoveReason?: string
  source?: Unit
  target?: Unit
  event?: BattleEvent
  cancelled?: boolean
  
  damage?: number
  
  hpDamage?: number
  /**  01 */
  defenseIgnore?: number
  
  heal?: number
  
  barrier?: number
  
  wound?: number
  kind?: DamageKind
  origin?: DamageOrigin
  skillId?: SkillId
  isPrimary?: boolean
  crit?: boolean
  chance?: number
  percentageDamage?: boolean
}

export type HookFn = (ctx: HookContext) => void

export class HookBus {
  private listeners = new Map<HookName, HookFn[]>()

  on(name: HookName, fn: HookFn): void {
    const list = this.listeners.get(name)
    if (list) list.push(fn)
    else this.listeners.set(name, [fn])
  }

  emit(name: HookName, ctx: HookContext = {}): HookContext {
    for (const fn of this.listeners.get(name) ?? []) fn(ctx)
    return ctx
  }
}
