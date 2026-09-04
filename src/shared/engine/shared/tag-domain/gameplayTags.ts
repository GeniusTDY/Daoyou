/**
 * GameplayTags: creation-v2  battle-v5
 *
 *
 * 1.
 * 2. ROOT
 * 3. Ability  Function / Channel / Kind / Element / Target“”“”
 */
export const GameplayTags = {
  // =====  =====
  UNIT: {
    ROOT: 'Unit',
    TYPE: {
      ROOT: 'Unit.Type',
      PLAYER: 'Unit.Type.Player',
      ENEMY: 'Unit.Type.Enemy',
      COMBATANT: 'Unit.Type.Combatant',
    },
  },

  // =====  =====
  // STATE CATEGORY CONTROL / IMMUNE
  STATUS: {
    ROOT: 'Status',
    IMMUNE: {
      ROOT: 'Status.Immune',
      CONTROL: 'Status.Immune.Control',
      DEBUFF: 'Status.Immune.Debuff',
      FIRE: 'Status.Immune.Fire',
    },
    STATE: {
      POISONED: 'Status.Poisoned',
      BURNED: 'Status.Burned',
      FROZEN: 'Status.Frozen',
      BLEEDING: 'Status.Bleeding',
      CHILLED: 'Status.Chilled',
      SHOCKED: 'Status.Shocked',
      BODY_ORGANS_SKILL_REFUNDED: 'Status.BodyCultivation.OrgansSkillRefunded',
    },
    SECT: {
      ROOT: 'Status.Sect',
      state: (sectId: string, stateId: string) => `Status.Sect.${sectId}.${stateId}`,
    },
    CATEGORY: {
      BUFF: 'Status.Buff',
      DEBUFF: 'Status.Debuff',
      DOT: 'Status.DOT',
      DEF_DEBUFF: 'Status.DefDebuff',
      MYTHIC: 'Status.Mythic',
      COMBO: 'Status.Combo',
      MANA_EFF: 'Status.ManaEff',
    },
    CONTROL: {
      ROOT: 'Status.Control',
      STUNNED: 'Status.Control.Stunned',
      NO_ACTION: 'Status.Control.NoAction',
      NO_SKILL: 'Status.Control.NoSkill',
      NO_BASIC: 'Status.Control.NoBasic',
    },
  },

  // =====  =====
  // Ability  battle-v5
  // - FUNCTIONdamage/heal/control/buff
  // - CHANNELmagic/physical/true
  // - KINDskill/passive/artifact/gongfa
  // - ELEMENT / TARGET
  ABILITY: {
    ROOT: 'Ability',
    FUNCTION: {
      ROOT: 'Ability.Function',
      DAMAGE: 'Ability.Function.Damage',
      CONTROL: 'Ability.Function.Control',
      HEAL: 'Ability.Function.Heal',
      BUFF: 'Ability.Function.Buff',
      DEBUFF: 'Ability.Function.Debuff',
    },
    CHANNEL: {
      ROOT: 'Ability.Channel',
      MAGIC: 'Ability.Channel.Magic',
      PHYSICAL: 'Ability.Channel.Physical',
      TRUE: 'Ability.Channel.True',
    },
    MECHANIC: {
      ROOT: 'Ability.Mechanic',
      IGNORE_SPIRITUAL_ROOT_MISMATCH:
        'Ability.Mechanic.IgnoreSpiritualRootMismatch',
    },
    KIND: {
      ROOT: 'Ability.Kind',
      SKILL: 'Ability.Kind.Skill',
      PASSIVE: 'Ability.Kind.Passive',
      ARTIFACT: 'Ability.Kind.Artifact',
      GONGFA: 'Ability.Kind.GongFa',
      SECT: 'Ability.Kind.Sect',
      BASIC: 'Ability.Kind.Basic',
    },
    SECT: {
      ROOT: 'Ability.Sect',
      namespace: (sectId: string) => `Ability.Sect.${sectId}`,
      path: (sectId: string, pathId: string) => `Ability.Sect.${sectId}.Path.${pathId}`,
      ability: (sectId: string, abilityId: string) => `Ability.Sect.${sectId}.Ability.${abilityId}`,
      mechanic: (sectId: string, mechanicId: string) => `Ability.Sect.${sectId}.Mechanic.${mechanicId}`,
      GENERATOR: 'Ability.Sect.Role.Generator',
      COMBO: 'Ability.Sect.Role.Combo',
      FINISHER: 'Ability.Sect.Role.Finisher',
      DEFENSIVE: 'Ability.Sect.Role.Defensive',
      UTILITY: 'Ability.Sect.Role.Utility',
    },
    ELEMENT: {
      ROOT: 'Ability.Element',
      FIRE: 'Ability.Element.Fire',
      WATER: 'Ability.Element.Water',
      WOOD: 'Ability.Element.Wood',
      EARTH: 'Ability.Element.Earth',
      METAL: 'Ability.Element.Metal',
      WIND: 'Ability.Element.Wind',
      ICE: 'Ability.Element.Ice',
      THUNDER: 'Ability.Element.Thunder',
    },
    TARGET: {
      ROOT: 'Ability.Target',
      SINGLE: 'Ability.Target.Single',
      AOE: 'Ability.Target.AoE',
    },
  },

  // ===== Buff  =====
  BUFF: {
    ROOT: 'Buff',
    TYPE: {
      ROOT: 'Buff.Type',
      BUFF: 'Buff.Type.Buff',
      DEBUFF: 'Buff.Type.Debuff',
      CONTROL: 'Buff.Type.Control',
    },
    DOT: {
      ROOT: 'Buff.Dot',
      POISON: 'Buff.Dot.Poison',
      BURN: 'Buff.Dot.Burn',
      FREEZE: 'Buff.Dot.Freeze',
      BLEED: 'Buff.Dot.Bleed',
    },
    ELEMENT: {
      ROOT: 'Buff.Element',
      FIRE: 'Buff.Element.Fire',
      WATER: 'Buff.Element.Water',
      WOOD: 'Buff.Element.Wood',
      EARTH: 'Buff.Element.Earth',
      METAL: 'Buff.Element.Metal',
      WIND: 'Buff.Element.Wind',
      ICE: 'Buff.Element.Ice',
      THUNDER: 'Buff.Element.Thunder',
      POISON: 'Buff.Element.Poison',
    },
    SECT: {
      ROOT: 'Buff.Sect',
      namespace: (sectId: string, buffId: string) => `Buff.Sect.${sectId}.${buffId}`,
    },
  },

  // =====  =====
  TRAIT: {
    ROOT: 'Trait',
    EXECUTE: 'Trait.Execute',
    REFLECT: 'Trait.Reflect',
    LIFESTEAL: 'Trait.Lifesteal',
    MANA_THIEF: 'Trait.ManaThief',
    SHIELD_MASTER: 'Trait.Shield',
    BERSERKER: 'Trait.Berserker',
    COOLDOWN: 'Trait.Cooldown',
  },

  // =====  =====
  CONDITION: {
    ROOT: 'Condition',
    LOW_HP: 'Condition.LowHP',
    HIGH_HP: 'Condition.HighHP',
    CRIT_READY: 'Condition.CritReady',
    TARGET: {
      ROOT: 'Condition.Target',
      LOW_HP: 'Condition.Target.LowHP',
    },
    CASTER: {
      ROOT: 'Condition.Caster',
      LOW_HP: 'Condition.Caster.LowHP',
    },
  },

  // =====  CombatEvent.type  =====
  EVENT: {
    ACTION_PRE: 'ActionPreEvent',
    ACTION_POST: 'ActionPostEvent',
    DAMAGE_TAKEN: 'DamageSegmentAppliedEvent',
    DAMAGE_REQUEST: 'DamageSegmentRequestedEvent',
    DAMAGE: 'DamageSegmentRequestedEvent',
    SHIELD_BREAK: 'ShieldBreakEvent',
    ROUND_PRE: 'RoundPreEvent',
    ROUND_POST: 'RoundPostEvent',
    ROUND_START: 'RoundStartEvent',
    SKILL_PRE_CAST: 'SkillPreCastEvent',
    SKILL_CAST: 'SkillCastEvent',
    HIT_CHECK: 'HitCheckEvent',
    DODGE: 'DodgeEvent',
    BUFF_ADD: 'BuffAddEvent',
    BUFF_APPLIED: 'BuffAppliedEvent',
    BUFF_REMOVED: 'BuffRemovedEvent',
    BUFF_IMMUNE: 'BuffImmuneEvent',
    BUFF_LAYER_CHANGED: 'BuffLayerChangedEvent',
    CONTROL_RESIST: 'ControlResistEvent',
    DEATH_PREVENT: 'DeathPreventEvent',
    CONTROLLED_SKIP: 'ControlledSkipEvent',
    COMBAT_RESOURCE_CHANGE: 'CombatResourceChangeEvent',
    ABILITY_COST_PAID: 'AbilityCostPaidEvent',
    HP_CHANGED: 'HpChangedEvent',
  },

  // =====  =====
  SCOPE: {
    OWNER_AS_TARGET: 'owner_as_target',
    OWNER_AS_ACTOR: 'owner_as_actor',
    OWNER_AS_CASTER: 'owner_as_caster',
    GLOBAL: 'global',
  },
} as const;

import type { ElementType } from '@shared/types/constants';

/**
 *  ElementType  Ability.Element.*
 *  AbilityTagAssembler  affix
 */
export const ELEMENT_TO_RUNTIME_ABILITY_TAG: Record<ElementType, string> = {
  金: GameplayTags.ABILITY.ELEMENT.METAL,
  木: GameplayTags.ABILITY.ELEMENT.WOOD,
  水: GameplayTags.ABILITY.ELEMENT.WATER,
  火: GameplayTags.ABILITY.ELEMENT.FIRE,
  土: GameplayTags.ABILITY.ELEMENT.EARTH,
  风: GameplayTags.ABILITY.ELEMENT.WIND,
  雷: GameplayTags.ABILITY.ELEMENT.THUNDER,
  冰: GameplayTags.ABILITY.ELEMENT.ICE,
};

export const DAMAGE_CHANNEL_ABILITY_TAGS = [
  GameplayTags.ABILITY.CHANNEL.MAGIC,
  GameplayTags.ABILITY.CHANNEL.PHYSICAL,
  GameplayTags.ABILITY.CHANNEL.TRUE,
] as const;

export type DamageChannel = (typeof DAMAGE_CHANNEL_ABILITY_TAGS)[number];
