/**
 *  skillOverrides
 *  ctx.skills.get
 */
import type { SkillDef, SkillId, Unit } from "./types.ts"

export function skillOf(
  skills: Map<SkillId, SkillDef>,
  unit: Unit,
  id: SkillId,
): SkillDef | undefined {
  return unit.skillOverrides[id] ?? skills.get(id)
}

export function overridesFrom(defs: SkillDef[] | undefined): Record<SkillId, SkillDef> {
  if (!defs?.length) return {}
  const out: Record<SkillId, SkillDef> = {}
  for (const def of defs) out[def.id] = def
  return out
}

/** Resolve active passive definitions consistently, including declared conflicts. */
export function passiveSkills(skills: Map<SkillId, SkillDef>, unit: Unit): SkillDef[] {
  return unit.passives.flatMap(id => {
    const skill = skillOf(skills, unit, id)
    return skill && !skill.conflicts?.some(other => unit.passives.includes(other) || unit.skills.includes(other)) ? [skill] : []
  })
}
