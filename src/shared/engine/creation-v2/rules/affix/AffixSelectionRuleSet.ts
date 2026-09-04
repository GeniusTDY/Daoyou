import { CREATION_RULE_PHASES } from '../../types';
import { AffixSelectionDecision, AffixSelectionFacts } from '../contracts';
import { RuleSet } from '../core';
import { AbilityTagCompatibilityRules } from './AbilityTagCompatibilityRules';
import { BudgetExhaustionRules } from './BudgetExhaustionRules';
import { ExclusiveGroupRules } from './ExclusiveGroupRules';
import { FallbackAffixRules } from './FallbackAffixRules';
import { GongfaSchoolPlanRules } from './GongfaSchoolPlanRules';
import { SlotCompatibilityRules } from './SlotCompatibilityRules';

/*
 * AffixSelectionRuleSet:
 *  slot facts  candidatePool
 */
export class AffixSelectionRuleSet {
  private readonly ruleSet = new RuleSet<AffixSelectionFacts, AffixSelectionDecision>(
    [
      new SlotCompatibilityRules(),
      new ExclusiveGroupRules(),
      new AbilityTagCompatibilityRules(),
      new BudgetExhaustionRules(),
      new GongfaSchoolPlanRules(),
      new FallbackAffixRules(),
    ],
    (facts) => ({
      candidatePool: [...facts.candidates],
      rejections: [],
      exhaustionReason: undefined,
      reasons: [],
      warnings: [],
      trace: [],
    }),
  );

  evaluate(facts: AffixSelectionFacts): AffixSelectionDecision {
    return this.ruleSet.evaluate(facts, {
      metadata: {
        phase: CREATION_RULE_PHASES.AFFIX_SELECTION,
      },
    });
  }
}
