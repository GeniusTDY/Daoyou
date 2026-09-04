import { AffixEffectTranslator } from '../../affixes/AffixEffectTranslator';
import { AffixRegistry } from '../../affixes/AffixRegistry';
import { RuleSet } from '../core/RuleSet';
import { CompositionDecision } from '../contracts/CompositionDecision';
import { CompositionFacts } from '../contracts/CompositionFacts';
import { EnergyConversionRules } from './EnergyConversionRules';
import { NamingRules } from './NamingRules';
import { OutcomeTagRules } from './OutcomeTagRules';
import { ProjectionRules } from './ProjectionRules';

/**
 * CompositionRuleSet
 * OutcomeTagRules → NamingRules → EnergyConversionRules → ProjectionRules
 *
 * EnergyConversionRules  ProjectionRules  decision.energyConversion
 * ProjectionRules
 */
/*
 * CompositionRuleSet: /
 * OutcomeTagRules -> NamingRules -> EnergyConversionRules -> ProjectionRules
 *  rolledAffixes  session facts  CompositionDecision///
 *  Composer  Decision  CreationProductModel  AbilityConfig
 */
/*
 * CompositionRuleSet:
 *  Composer composition facts// compositionDecision
 */
export class CompositionRuleSet {
  private readonly ruleSet: RuleSet<CompositionFacts, CompositionDecision>;

  constructor(
    registry: AffixRegistry,
    translator: AffixEffectTranslator = new AffixEffectTranslator(),
  ) {
    this.ruleSet = new RuleSet<CompositionFacts, CompositionDecision>(
      [
        new OutcomeTagRules(),
        new NamingRules(),
        new EnergyConversionRules(),
        new ProjectionRules(registry, translator),
      ],
      (facts) => ({
        productType: facts.productType,
        name: '',
        description: undefined,
        outcomeTags: [],
        affixes: facts.affixes,
        defaultsApplied: [],
        reasons: [],
        warnings: [],
        trace: [],
      }),
    );
  }

  evaluate(facts: CompositionFacts): CompositionDecision {
    return this.ruleSet.evaluate(facts);
  }
}
