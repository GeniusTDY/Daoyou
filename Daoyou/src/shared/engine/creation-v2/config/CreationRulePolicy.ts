/**
 * CreationRulePolicy
 *  —  CompositionRuleSet
 */

/** RuleDiagnostics trace outcome  RuleTraceOutcome = 'applied' | 'skipped' | 'blocked'  */
export const CREATION_RULE_OUTCOMES = {
  applied: 'applied',
  skipped: 'skipped',
  blocked: 'blocked',
} as const;

export type CreationRuleOutcome =
  (typeof CREATION_RULE_OUTCOMES)[keyof typeof CREATION_RULE_OUTCOMES];

/**  CompositionRuleSet  phases  */
export const COMPOSITION_RULE_PHASE_ORDER = [
  'composition.outcome_tags',
  'composition.naming',
  'composition.energy_conversion',
  'composition.projection',
  'composition.fallback_outcome',
] as const;

export type CompositionRulePhaseId = (typeof COMPOSITION_RULE_PHASE_ORDER)[number];
