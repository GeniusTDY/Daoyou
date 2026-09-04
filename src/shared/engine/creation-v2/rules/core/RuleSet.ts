/*
 * RuleSet:
 *  Rule  RuleDiagnostics diagnostics  Decision
 *  rules  evaluate(facts) -> decision
 */
import { Rule } from './Rule';
import { RuleContextMetadata } from './RuleContext';

import { RuleDecisionMeta } from './types';

/*
 * RuleSet:
 *  Rule[] RuleDiagnostics  Decisionreasons/warnings/trace
 * Rule  RuleContext dagnostics
 */
export class RuleSet<TFacts, TDecision extends RuleDecisionMeta> {
  constructor(
    private readonly rules: readonly Rule<TFacts, TDecision>[],
    private readonly createDecision: (
      facts: TFacts,
      seed?: Partial<TDecision>,
    ) => TDecision,
  ) {}

  evaluate(
    facts: TFacts,
    options: {
      seed?: Partial<TDecision>;
      metadata?: RuleContextMetadata;
    } = {},
  ): TDecision {
    const decision = this.createDecision(facts, options.seed);
    const context = {
      facts,
      decision,
      metadata: options.metadata ?? {},
    };

    for (const rule of this.rules) {
      rule.apply(context);
    }



    return decision;
  }
}