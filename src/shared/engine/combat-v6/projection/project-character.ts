import { COMBAT_V6_PHASE_6D_VERSIONS } from "../version.ts"
import { projectCultivatorWithEquipmentSpecialInternal } from "./project-cultivator-with-equipment-special.ts"
import { composeCharacterManuals } from "./compose-character-manuals.ts"
import type { CharacterCombatInput, CombatV6ProjectionResult } from "./types.ts"


export function projectCharacterToCombatV6(input: CharacterCombatInput, includeEffectiveAttributes = false): CombatV6ProjectionResult {
  const versions = { ...COMBAT_V6_PHASE_6D_VERSIONS }
  return composeCharacterManuals(input, versions, (personal) =>
    projectCultivatorWithEquipmentSpecialInternal(personal, versions, "current", includeEffectiveAttributes), includeEffectiveAttributes)
}
