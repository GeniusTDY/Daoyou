/*
 * affixes/types.ts: Affix
 *  AffixDefinition
 */
import { TargetPolicyConfig } from '@shared/engine/battle-v5/abilities/TargetPolicy';
import type { DamageType } from '@shared/engine/battle-v5/core/types';
import { EquipmentSlot } from '@shared/types/constants';
import {
  AttributeType,
  BuffConfig,
  BuffImmunityParams,
  ConditionConfig,
  DamageImmunityParams,
  GlobalUniqueConfig,
  ListenerConfig,
  ListenerContextMapping,
  ListenerGuardConfig,
  ListenerScope,
  ModifierType,
} from '../contracts/battle';
import type {
  AffixRarity,
  AffixSelectionMeta,
  AffixSlot,
  CreationProductType,
  CreationTagSignalSource,
} from '../types';
import type { ExclusiveGroup } from './exclusiveGroups';

export type { AffixRarity, AffixSlot } from '../types';

// =====  =====

/** ScalableValueV2  scale  */
export const SCALE_MODE = {
  QUALITY: 'quality',
  NONE: 'none',
} as const;
export type ScaleMode = (typeof SCALE_MODE)[keyof typeof SCALE_MODE];

/** percent_damage_modifier  mode  */
export const PERCENT_MODIFIER_MODE = {
  INCREASE: 'increase',
  REDUCE: 'reduce',
} as const;
export type PercentModifierMode =
  (typeof PERCENT_MODIFIER_MODE)[keyof typeof PERCENT_MODIFIER_MODE];

/**
 * V2 resolved = base + qualityOrder * coefficient
 */
export interface ScalableValueV2 {
  base: number;
  scale: ScaleMode;
  coefficient: number;
  min?: number;
  max?: number;
}


export type ScalableParam = number | ScalableValueV2;

// =====  =====

/**
 *  battle-v5 ScalableValue
 * baseattribute coefficient
 *  battle-v5
 */
export interface AffixScalableValue {
  base?: ScalableParam;
  attribute?: AttributeType;
  coefficient?: ScalableParam;
  /**  0.08  8% */
  targetMaxHpRatio?: ScalableParam;
  /**  0.08  8% */
  targetMaxMpRatio?: ScalableParam;
}

export type AffixBuffConfig = Omit<BuffConfig, 'listeners'> & {
  listeners?: Array<
    Omit<ListenerConfig, 'effects'> & { effects: AffixEffectTemplate[] }
  >;
};

/**
 *  battle-v5 EffectConfig.conditions
 */
export interface AffixEffectTemplateBase {
  conditions?: ConditionConfig[];
}

export interface AffixAttributeModifierTemplate {
  attrType: AttributeType;
  modType: ModifierType;
  value: ScalableParam;
}

/**
 *  battle-v5 EffectConfig ScalableParam
 *
 * - damage / heal / shield / mana_burnparams.value  AffixScalableValue
 * - apply_buff BuffConfig buff
 * - attribute_modifier AbilityConfig.modifiers
 * - percent_damage_modifier / dispel
 */
export type AffixEffectTemplate = AffixEffectTemplateBase &
  (
    | {
        type: 'damage';
        params: { value: AffixScalableValue; damageType?: DamageType };
      }
    | {
        type: 'heal';
        params: { value: AffixScalableValue; target?: 'hp' | 'mp' };
      }
    | { type: 'shield'; params: { value: AffixScalableValue } }
    | { type: 'mana_burn'; params: { value: AffixScalableValue } }
    | {
        type: 'resource_drain';
        params: {
          sourceType: 'hp' | 'mp';
          targetType: 'hp' | 'mp';
          ratio: ScalableParam;
        };
      }
    | { type: 'magic_shield'; params: { absorbRatio?: ScalableParam } }
    | { type: 'reflect'; params: { ratio: ScalableParam } }
    | {
        type: 'cooldown_modify';
        params: {
          cdModifyValue: ScalableParam;
          tags?: string[];
          maxCount?: number;
        };
      }
    | {
        type: 'tag_trigger';
        params: {
          triggerTag: string;
          damageRatio?: ScalableParam;
          removeOnTrigger?: boolean;
          effects?: AffixEffectTemplate[];
        };
      }
    | {
        type: 'consume_status_trigger';
        params: {
          match: { id?: string; tags?: string[] };
          consume?: 'one' | 'all' | number;
          effects: AffixEffectTemplate[];
        };
      }
    | {
        type: 'delayed_effect';
        params: {
          id: string;
          name: string;
          description?: string;
          delayTurns: ScalableParam;
          effects: AffixEffectTemplate[];
          tags?: string[];
          statusTags?: string[];
          record?: {
            key: string;
            event: 'damage_taken' | 'heal' | 'shield' | 'shield_break';
            maxStored?: ScalableParam;
            maxStoredValue?: AffixScalableValue;
          };
          triggerOnDispel?: boolean;
          maxTriggers?: number;
        };
      }
    | {
        type: 'damage_memory';
        params: {
          key: string;
          mode: 'record' | 'release' | 'clear';
          event?:
            | 'damage_taken'
            | 'damage_dealt'
            | 'heal'
            | 'shield'
            | 'critical_taken'
            | 'shield_break';
          ratio?: ScalableParam;
          releaseAs?: 'damage' | 'heal' | 'shield' | 'reflect';
          target?: 'caster' | 'target';
          maxStored?: ScalableParam;
          maxStoredValue?: AffixScalableValue;
          includeShieldAbsorbed?: boolean;
          consume?: boolean;
        };
      }
    | {
        type: 'buff_layer_modify';
        params: {
          match: { id?: string; tags?: string[] };
          operation: 'add' | 'subtract' | 'clear' | 'set';
          layers?: ScalableParam;
          effects?: AffixEffectTemplate[];
          scaleEffectsByLayer?: boolean;
        };
      }
    | {
        type: 'ability_transform';
        params: {
          id: string;
          triggers?: number;
          appliesToTags?: string[];
          trueDamage?: boolean;
          addDispel?: { targetTag?: string; maxCount?: number };
          mpCostToHp?: boolean;
          cooldownModify?: ScalableParam;
          forceCritical?: boolean;
          bonusDamageMemory?: {
            key: string;
            ratio?: ScalableParam;
            consume?: boolean;
          };
        };
      }
    | {
        type: 'hp_sacrifice_damage';
        params: {
          hpRatio: ScalableParam;
          damagePerHp: ScalableParam;
          minHpFloor?: number;
        };
      }
    | {
        type: 'ability_lock';
        params: { rounds: ScalableParam; tags?: string[]; maxCount?: number };
      }
    | {
        type: 'status_spread';
        params: { match: { id?: string; tags?: string[] }; maxCount?: number };
      }
    | {
        type: 'buff_copy';
        params: {
          id?: string;
          match?: { id?: string; tags?: string[] };
          target?: 'caster' | 'target';
          durationDelta?: ScalableParam;
          replayRemoved?: boolean;
          maxTriggers?: number;
        };
      }
    | {
        type: 'damage_defer';
        params: {
          ratio: ScalableParam;
          delayTurns: ScalableParam;
          thresholdMaxHpRatio?: ScalableParam;
        };
      }
    | {
        type: 'next_hit_rule';
        params: {
          forceCritical?: boolean;
          triggers?: number;
          appliesToTags?: string[];
        };
      }
    | {
        type: 'dynamic_scalar';
        params: {
          mode: 'increase' | 'reduce';
          value: ScalableParam;
          resource: 'hp' | 'mp';
          lowerIsStronger?: boolean;
          cap?: number;
        };
      }
    | {
        type: 'turn_state_counter';
        params: {
          key: string;
          event: 'no_damage_dealt' | 'damage_dealt';
          threshold: number;
          effects: AffixEffectTemplate[];
          resetOnTrigger?: boolean;
        };
      }
    | {
        type: 'runtime_counter_modify';
        params: {
          key: string;
          operation: 'add' | 'subtract' | 'set' | 'reset';
          amount?: number;
          min?: number;
          max?: number;
          target?: 'caster' | 'target';
          effects?: AffixEffectTemplate[];
          scaleEffectsByAmount?: boolean;
        };
      }
    | {
        type: 'effect_sequence';
        params: { effects: AffixEffectTemplate[] };
      }
    | {
        type: 'apply_buff';
        params: {
          buffConfig: AffixBuffConfig;
          chance?: ScalableParam;
          target?: 'caster' | 'target';
        };
      }
    | {
        /**
         *  gongfa / artifact
         *  ProjectionRules  AbilityConfig.modifiers
         */
        type: 'attribute_modifier';
        params:
          | {
              modifiers: AffixAttributeModifierTemplate[];
            }
          | {
              attrType: AttributeType;
              modType: ModifierType;
              value: ScalableParam;
            };
      }
    | {
        type: 'percent_damage_modifier';
        params: {
          mode: PercentModifierMode;
          value: ScalableParam;
          cap?: number;
        };
      }
    | {
        type: 'death_prevent';
        params: { hpFloorPercent?: ScalableParam; triggerKey?: string };
      }
    | { type: 'buff_immunity'; params: BuffImmunityParams }
    | { type: 'damage_immunity'; params: DamageImmunityParams }
    | { type: 'dispel'; params: { targetTag?: string; maxCount?: number } }
    | {
        /**
         *  artifact/gongfa
         *  pool  pickCount  AbilityConfig.modifiers
         *  attrTypemodType  value
         *  ProjectionRules  AffixEffectTranslator
         */
        type: 'random_attribute_modifier';
        params: {
          pool: AffixAttributeModifierTemplate[];
          pickCount: number;
        };
      }
  );

// =====  =====

/**
 *  listener
 * artifact / gongfa listener
 */
export interface AffixListenerSpec {
  eventType: string;
  scope: ListenerScope;
  priority: number;
  mapping?: ListenerContextMapping;
  guard?: ListenerGuardConfig;
}

export interface AffixTagMatchGroup {
  all?: string[];
  any?: string[];
  none?: string[];
}

export interface AffixTagMatcher extends AffixTagMatchGroup {
  sources?: Partial<Record<CreationTagSignalSource, AffixTagMatchGroup>>;
}

export function matchAll(tags: string[]): AffixTagMatcher {
  return tags.length > 0 ? { all: tags } : {};
}

export function matchAny(tags: string[]): AffixTagMatcher {
  return tags.length > 0 ? { any: tags } : {};
}

export function matchNone(tags: string[]): AffixTagMatcher {
  return tags.length > 0 ? { none: tags } : {};
}

export function flattenAffixMatcherTags(match: AffixTagMatcher): string[] {
  const tags = new Set<string>();

  const collectPositiveTags = (group?: AffixTagMatchGroup) => {
    group?.all?.forEach((tag) => tags.add(tag));
    group?.any?.forEach((tag) => tags.add(tag));
  };

  collectPositiveTags(match);
  Object.values(match.sources ?? {}).forEach((group) =>
    collectPositiveTags(group),
  );

  return Array.from(tags);
}

export function collectAffixMatcherReferencedTags(
  match: AffixTagMatcher,
): string[] {
  const tags = new Set<string>();

  const collectAllTags = (group?: AffixTagMatchGroup) => {
    group?.all?.forEach((tag) => tags.add(tag));
    group?.any?.forEach((tag) => tags.add(tag));
    group?.none?.forEach((tag) => tags.add(tag));
  };

  collectAllTags(match);
  Object.values(match.sources ?? {}).forEach((group) => collectAllTags(group));

  return Array.from(tags);
}

// =====  =====

export interface AffixDefinition {
  id: string;
  displayName: string;
  displayDescription: string;
  
  slot: AffixSlot;
  
  rarity: AffixRarity;
  /**
   *  affix /
   */
  match: AffixTagMatcher;
  /**  exclusiveGroup  */
  exclusiveGroup?: ExclusiveGroup;
  
  weight: number;
  
  energyCost: number;
  
  applicableArtifactSlots?: EquipmentSlot[];
  
  targetPolicyConstraint?: Partial<TargetPolicyConfig>;
  /**  ability tags */
  selectionMeta?: AffixSelectionMeta;
  
  effectTemplate: AffixEffectTemplate;
  /**  key  */
  globalUnique?: GlobalUniqueConfig;
  /** artifact/gongfa  */
  listenerSpec?: AffixListenerSpec;
  
  applicableTo: CreationProductType[];
  /**
   *
   *  creation-v2  affix  abilityTags
   */
  grantedAbilityTags?: string[];
}
