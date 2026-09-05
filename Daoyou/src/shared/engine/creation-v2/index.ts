/*
 * engine/creation-v2 OrchestratorSession//Composer/Adapter
 *  API
 */
export { CreationOrchestrator } from './CreationOrchestrator';
export { CreationSession } from './CreationSession';
export { BattleAbilityBuilder } from './adapters/BattleAbilityBuilder';
export { CreationAbilityAdapter } from './adapters/CreationAbilityAdapter';
export {
  composeProductFromAffixIds,
  type ComposeProductFromAffixIdsArgs,
  type ComposedProductModel,
} from './composeProductFromAffixIds';
export type {
	CreationAbilityBuilder,
	CreationOutcomeMaterializer,
} from './adapters/types';
export { DefaultMaterialAnalyzer } from './analysis/DefaultMaterialAnalyzer';
export { MaterialTagNormalizer } from './analysis/MaterialTagNormalizer';
export { DefaultEnergyBudgeter } from './budgeting/DefaultEnergyBudgeter';
export {
	resolveAffixSlotLayout,
} from './config/AffixSelectionConstraints';
export type { AffixSlotLayoutStep } from './config/AffixSelectionConstraints';
export { CreationEventBus } from './core/EventBus';
export { CreationTagContainer, CreationTags } from '@shared/engine/shared/tag-domain';
export { CreationPhaseHandlerRegistry } from './handlers/CreationPhaseHandlers';
export type { CreationPhaseHandlerDeps } from './handlers/CreationPhaseHandlers';
export * from './core/events';
export * from './core/types';
export { DefaultIntentResolver } from './resolvers/DefaultIntentResolver';
export { DefaultRecipeValidator } from './rules/DefaultRecipeValidator';
export * from './rules/ruleExports';
export { RuleDiagnostics, RuleSet } from './rules/core';
export type {
	Rule,
	RuleContext,
	RuleContextMetadata,
	RuleDecisionMeta,
	RuleReason,
	RuleTraceEntry,
	RuleTraceOutcome,
} from './rules/core';
export type {
	AffixEligibilityFacts,
	AffixPoolDecision,
	AffixSelectionDecision,
	AffixSelectionFacts,
	CompositionDecision,
	CompositionEnergySummary,
	CompositionFacts,
	MaterialDecision,
	MaterialFacts,
	RecipeDecision,
	RecipeFacts,
} from './rules/contracts';
export * from './types';
export * from './errors';
