/*
 * GongFaBlueprintComposer:  rolledAffixes  composition decision gongfa CreationBlueprint
 * passive domain-specific  equip/persistence/progression
 */
import { AffixEffectTranslator } from '../affixes/AffixEffectTranslator';
import { AffixRegistry } from '../affixes/AffixRegistry';
import { estimateBalanceMetrics } from '../balancing/PBU';
import { CreationSession } from '../CreationSession';
import { GongFaProductModel } from '../models';
import { GONGFA_POLICIES, GongFaDomainConfig } from '../models/types';
import { CreationBlueprint } from '../types';
import { CompositionRuleSet } from '../rules/composition/CompositionRuleSet';
import { CompositionFacts } from '../rules/contracts/CompositionFacts';
import { PassiveProjectionPolicy } from '../rules/contracts/CompositionDecision';
import { buildCompositionFacts } from './shared';
import { buildAbilitySlug, ProductBlueprintComposer } from './types';

/**
 *  Composer
 *  gongfa passive ability
 *  CompositionRuleSet rules/composition/
 */
export class GongFaBlueprintComposer implements ProductBlueprintComposer {
  private readonly compositionRuleSet: CompositionRuleSet;

  constructor(
    private readonly registry: AffixRegistry,
    translator: AffixEffectTranslator,
  ) {
    this.compositionRuleSet = new CompositionRuleSet(registry, translator);
  }

  compose(session: CreationSession): CreationBlueprint {
    const { rolledAffixes, input } = session.state;
    const facts: CompositionFacts = buildCompositionFacts(session, 'gongfa', this.registry);
    const projectionQuality = facts.projectionQualityProfile.quality;

    const decision = this.compositionRuleSet.evaluate(facts);
    const policy = decision.projectionPolicy as PassiveProjectionPolicy | undefined;
    if (!policy || policy.kind !== 'gongfa_passive') {
      throw new Error('CompositionRuleSet did not produce a gongfa projection policy');
    }

    const domainConfig: GongFaDomainConfig = {
      equipPolicy: GONGFA_POLICIES.EQUIP,
      persistencePolicy: GONGFA_POLICIES.PERSISTENCE,
      progressionPolicy: GONGFA_POLICIES.PROGRESSION,
    };

    const productModel: GongFaProductModel = {
      productType: "gongfa",
      slug: buildAbilitySlug(input.slugSeed ?? session.id, input.productType),
      name: decision.name,
      description: decision.description,
      projectionQuality,
      outcomeTags: decision.outcomeTags,
      affixes: rolledAffixes,
      balanceMetrics: estimateBalanceMetrics(
        rolledAffixes,
        projectionQuality,
      ),
      gongfaConfig: domainConfig,
      battleProjection: {
        projectionKind: 'gongfa_passive',
        abilityTags: policy.abilityTags,
        listeners: policy.listeners,
        modifiers: policy.modifiers,
      },
    };

    return {
      productType: productModel.productType,
      productModel,
    };
  }
}
