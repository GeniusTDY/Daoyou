/**
 *  →  →  action
 */
import { resolveAction, turnOrder } from "./action.ts"
import type { BattleContext } from "./context.ts"
import { EventType } from "./enums.ts"

export { applyRoundFlags, clearRoundFlags, lockCommands, turnOrder } from "./action.ts"

export function resolveRoundActions(ctx: BattleContext, afterAction?: () => void): void {
  const order = turnOrder(ctx)
  ctx.emit({ type: EventType.TurnOrder, unitIds: order.map((u) => u.id) })
  for (const unit of order) {
    if (ctx.state.result) break
    resolveAction(ctx, unit)
    afterAction?.()
  }
}
