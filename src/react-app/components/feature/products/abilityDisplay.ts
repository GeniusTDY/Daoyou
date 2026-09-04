/**
 * abilityDisplay
 *
 *  creation-v2  `CreationProductModel` `battleProjection`
 * `affixes``balanceMetrics`  battle-v5  `AbilityConfig` / `AttributeModifierConfig`
 *  UI
 *
 *  /  /
 * productModel
 */

import { AttributeType, ModifierType } from '@shared/engine/battle-v5/core/types';
import type {
  AttributeModifierConfig,
} from '@shared/engine/battle-v5/core/configs';
import type {
  CreationProductModel,
  ArtifactProductModel,
  GongFaProductModel,
  SkillProductModel,
} from '@shared/engine/creation-v2/models/types';
import { rehydrateStoredProductModel } from '@shared/engine/creation-v2/persistence/ProductPersistenceMapper';
import type { RolledAffix } from '@shared/engine/creation-v2/types';
import {
  renderAffixMechanic,
  rarityToTone,
  type AffixRarity,
  type AffixBuffDetailView,
} from '@shared/engine/battle-v5/effects/affixText';
import { ATTR_LABELS } from '@shared/engine/battle-v5/effects/affixText/attributes';
import { type ElementType, type Quality } from '@shared/types/constants';

// =====  =====

export type AffixRarityTone = 'muted' | 'info' | 'rare' | 'legendary';

export interface AffixView {
  id: string;
  name: string;
  /** [] [] [+] */
  bodyText: string;
  /** / AffixDefinition.displayDescription */
  intentText?: string;
  /** “”“” */
  triggerText?: string;
  
  conditionTexts: string[];
  
  effectText: string;
  
  formulaText?: string;
  /** apply_buff  */
  buffDetails: AffixBuffDetailView[];
  /** “”“DOT” */
  damageTypeLabels: string[];
  /**  tag */
  tagLabels: string[];
  /**  DOT  */
  mechanicNotes: string[];
  
  globalUniqueText?: string;
  
  rarityTone: AffixRarityTone;
  /** common/uncommon/rare/legendary */
  rarity: AffixRarity;
  /** roll  */
  isPerfect: boolean;
  /** battle-v5 ability tags  */
  tags: string[];
}

export interface AttributeModifierView {
  attrLabel: string;
  attrKey: AttributeType;
  /**  "+15" / "+10%" */
  valueText: string;
  raw: AttributeModifierConfig;
}

export interface AbilityProjectionSummary {
  /** ' /  / '  */
  kindLabel: string;
  projectionKind: 'active_skill' | 'artifact_passive' | 'gongfa_passive';
  tags: string[];
  mpCost?: number;
  cooldown?: number;
  priority?: number;
  targetPolicy?: {
    team: 'enemy' | 'ally' | 'self' | 'any';
    scope: 'single' | 'aoe' | 'random';
    maxTargets?: number;
  };
}

export interface ProductDisplayModel {
  name: string;
  originalName?: string;
  description?: string;
  productType: 'skill' | 'artifact' | 'gongfa';
  quality?: Quality;
  element?: ElementType;
  slot?: string;
  score: number;
  isEquipped?: boolean;
  affixes: AffixView[];
  modifiers: AttributeModifierView[];
  projection?: AbilityProjectionSummary;
  rawModel?: CreationProductModel;
}

// =====  =====

export function formatAttributeValue(
  modifier: AttributeModifierConfig,
): string {
  const prefix = modifier.value >= 0 ? '+' : '';
  const abs = Math.abs(modifier.value);
  switch (modifier.type) {
    // ADD  battle-v5  "" (final *= 1 + sum)
    case ModifierType.ADD:
      return `${prefix}${formatNumber(abs * 100)}%`;
    // MULTIPLY value > 1 < 1
    case ModifierType.MULTIPLY:
      return `×${formatNumber(modifier.value)}`;
    case ModifierType.BASE:
    case ModifierType.FIXED:
    default:
      return `${prefix}${formatNumber(abs)}`;
  }
}

export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '0';
  return value
    .toFixed(digits)
    .replace(/\.?0+$/, '');
}

export function toAttributeModifierView(
  modifier: AttributeModifierConfig,
): AttributeModifierView {
  return {
    attrKey: modifier.attrType,
    attrLabel: ATTR_LABELS[modifier.attrType] ?? modifier.attrType,
    valueText: formatAttributeValue(modifier),
    raw: modifier,
  };
}

// =====  =====

/**
 *  RolledAffix  UI
 *
 * @param affix   rolled  id /  /
 * @param quality  effectTemplate
 */
export function toAffixView(
  affix: RolledAffix,
  quality: Quality,
  resolvedModifiers?: AttributeModifierConfig[],
  abilityTags?: string[],
): AffixView {
  const mechanic = renderAffixMechanic(affix, quality, {
    resolvedModifiers,
    abilityTags,
  });
  return {
    id: mechanic.id,
    name: mechanic.name,
    bodyText: mechanic.bodyText,
    intentText: mechanic.intentText,
    triggerText: mechanic.triggerText,
    conditionTexts: mechanic.conditionTexts,
    effectText: mechanic.effectText,
    formulaText: mechanic.formulaText,
    buffDetails: mechanic.buffDetails,
    damageTypeLabels: mechanic.damageTypeLabels,
    tagLabels: mechanic.tagLabels,
    mechanicNotes: mechanic.mechanicNotes,
    globalUniqueText: mechanic.globalUniqueText,
    rarity: mechanic.rarity,
    rarityTone: rarityToTone(mechanic.rarity),
    isPerfect: mechanic.isPerfect,
    tags: (affix.tags as string[] | undefined) ?? [],
  };
}

function buildProjection(
  model: CreationProductModel,
): AbilityProjectionSummary | undefined {
  const projection = model.battleProjection as
    | SkillProductModel['battleProjection']
    | ArtifactProductModel['battleProjection']
    | GongFaProductModel['battleProjection']
    | undefined;
  if (!projection) return undefined;

  const base: AbilityProjectionSummary = {
    projectionKind: projection.projectionKind,
    kindLabel:
      projection.projectionKind === 'active_skill'
        ? '主动神通'
        : projection.projectionKind === 'gongfa_passive'
          ? '功法·被动'
          : '法宝·被动',
    tags: projection.abilityTags ?? [],
  };

  if (projection.projectionKind === 'active_skill') {
    base.mpCost = projection.mpCost;
    base.cooldown = projection.cooldown;
    base.priority = projection.priority;
    base.targetPolicy = projection.targetPolicy;
  }

  return base;
}

function collectModifiers(
  model: CreationProductModel,
): AttributeModifierConfig[] {
  const projection = model.battleProjection as
    | ArtifactProductModel['battleProjection']
    | GongFaProductModel['battleProjection']
    | SkillProductModel['battleProjection'];
  if (!projection) return [];
  if (
    projection.projectionKind === 'artifact_passive' ||
    projection.projectionKind === 'gongfa_passive'
  ) {
    return projection.modifiers ?? [];
  }
  return [];
}

function collectAbilityTags(model: CreationProductModel): string[] {
  return model.battleProjection?.abilityTags ?? [];
}

function getAffixModifierCount(affix: RolledAffix): number {
  const template = affix.effectTemplate;
  if (!template) return 0;

  if (template.type === 'attribute_modifier') {
    return 'modifiers' in template.params ? template.params.modifiers.length : 1;
  }

  if (template.type === 'random_attribute_modifier') {
    return affix.modifierSelections?.length ?? 0;
  }

  return 0;
}

function allocateResolvedModifiersByAffix(
  affixes: RolledAffix[],
  projectionModifiers: AttributeModifierConfig[],
): AttributeModifierConfig[][] {
  let cursor = 0;
  return affixes.map((affix) => {
    const count = getAffixModifierCount(affix);
    if (count <= 0) return [];

    const resolved = projectionModifiers.slice(cursor, cursor + count);
    cursor += count;
    return resolved;
  });
}

/**
 * DB/API  `CreationProductRecord`
 */
export interface ProductRecordLike {
  id?: string;
  name?: string;
  description?: string | null;
  productType?: string;
  element?: ElementType | null;
  quality?: Quality | null;
  slot?: string | null;
  score?: number;
  isEquipped?: boolean;
  productModel?: unknown;
}

export function formatTargetPolicy(policy: AbilityProjectionSummary['targetPolicy']): string {
  const targetPolicyValue = formatTargetPolicyValue(policy);
  return targetPolicyValue ? `目标策略：${targetPolicyValue}` : '';
}

export function formatTargetPolicyValue(
  policy: AbilityProjectionSummary['targetPolicy'],
): string {
  if (!policy) return '';

  const teamLabels: Record<string, string> = {
    enemy: '敌方',
    ally: '友方',
    self: '自身',
    any: '任意',
  };

  const scopeLabels: Record<string, string> = {
    single: '单体',
    aoe: '群体',
    random: '随机',
  };

  const team = teamLabels[policy.team] ?? policy.team;
  const scope = scopeLabels[policy.scope] ?? policy.scope;
  const maxTargets =
    policy.scope !== 'single' && policy.maxTargets && policy.maxTargets > 1
      ? `（最多 ${policy.maxTargets}）`
      : '';

  if (policy.team === 'self') {
    return `自身${maxTargets}`;
  }

  return `${team}·${scope}${maxTargets}`;
}

const DEFAULT_QUALITY: Quality = '凡品';

function normalizeProductModel(
  record: ProductRecordLike,
): CreationProductModel | undefined {
  return rehydrateStoredProductModel(
    (record.productModel ?? null) as Record<string, unknown> | null,
    record.element ?? undefined,
  );
}

/**
 *  `/api/v2/products`  UI
 * `productModel`  battle-v5  creation-v2
 */
export function toProductDisplayModel(
  record: ProductRecordLike,
): ProductDisplayModel {
  const rawModel = normalizeProductModel(record);
  const quality =
    (rawModel?.projectionQuality as Quality | undefined) ??
    ((record.quality as Quality | null) ?? DEFAULT_QUALITY);
  const projectionModifiers = rawModel ? collectModifiers(rawModel) : [];
  const abilityTags = rawModel ? collectAbilityTags(rawModel) : [];
  const rawAffixes = rawModel?.affixes ?? [];
  const modifiersByAffix = allocateResolvedModifiersByAffix(
    rawAffixes,
    projectionModifiers,
  );
  const affixes = rawAffixes.map((affix, index) =>
    toAffixView(affix, quality, modifiersByAffix[index], abilityTags),
  );
  const modifiers = projectionModifiers.map(toAttributeModifierView);

  return {
    name: rawModel?.name ?? record.name ?? '未知产物',
    originalName: rawModel?.originalName,
    description: rawModel?.description ?? record.description ?? undefined,
    productType:
      (rawModel?.productType as ProductDisplayModel['productType']) ??
      (record.productType as ProductDisplayModel['productType']),
    quality,
    element: record.element ?? undefined,
    slot: record.slot ?? undefined,
    score: record.score ?? 0,
    isEquipped: Boolean(record.isEquipped),
    affixes,
    modifiers,
    projection: rawModel ? buildProjection(rawModel) : undefined,
    rawModel,
  };
}
