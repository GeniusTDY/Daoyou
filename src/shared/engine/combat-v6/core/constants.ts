/**
 *
 *  rules
 */

/** / */
export const MIN_DAMAGE = 1

/**  0 */
export const MIN_HP = 1

/**  1 */
export const MIN_MAX_HP = 1


export const DEFAULT_HIT = 100


export const DEFAULT_TARGET_COUNT = 1


export const DEFAULT_HITS = 1

/** 1 =  */
export const DEFAULT_DAMAGE_TAKEN = 1


export const NORMAL_ATTACK_COEFF = 1

/** /when  skillId skills[] */
export const BUILTIN_SKILL_ID = {
  Attack: "attack",
} as const

/**
 *  Attrs
 */
export const ATTR_NAMES = [
  "hp",
  "maxHp",
  "mp",
  "maxMp",
  "physicalAtk", 
  "physicalDef", 
  "magicAtk", 
  "magicDef", 
  "healPower",
  "speed",
  "hit",
  "dodge",
  "critRate", //  0–1
  "spellCritRate", //  0–1
  "physicalFuryRate", //  0–1
  "sealHit",
  "sealResist",
  "attackCultivate", 
  "defenseCultivate", 
  "spellCultivate", 
  "resistSpellCultivate", 
] as const

export type AttrName = (typeof ATTR_NAMES)[number]
