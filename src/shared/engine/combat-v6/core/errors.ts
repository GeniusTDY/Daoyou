/** Host  `code`  message */

export class BattleError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "BattleError"
    this.code = code
  }
}

export const ErrorCode = {
  LineupEmpty: "lineup-empty",
  BothSidesRequired: "both-sides-required",
  DuplicateUnit: "duplicate-unit",
  UnknownOwner: "unknown-owner",
  CommandsLocked: "commands-locked",
  UnitCannotAct: "unit-cannot-act",
  NotCommandPhase: "not-command-phase",
} as const
