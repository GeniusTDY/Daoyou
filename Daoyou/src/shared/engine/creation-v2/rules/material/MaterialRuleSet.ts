import { CREATION_RULE_PHASES } from '../../types';
import { MaterialDecision, MaterialFacts } from '../contracts';
import { RuleSet } from '../core';
import { MaterialConflictRules } from './MaterialConflictRules';
import { MaterialManualAlignmentRules } from './MaterialManualAlignmentRules';
import { MaterialSemanticRules } from './MaterialSemanticRules';
import { MaterialTypeRules } from './MaterialTypeRules';
import { RecipeBiasRules } from './RecipeBiasRules';

/*
 * MaterialRuleSet:
 * /// MaterialDecision
 */
export class MaterialRuleSet {
  private readonly ruleSet = new RuleSet<MaterialFacts, MaterialDecision>(
    [
      // Stage 2: // trace
      new MaterialTypeRules(),
      new MaterialSemanticRules(),
      new RecipeBiasRules(),
      //  valid
      new MaterialConflictRules(),
      
      new MaterialManualAlignmentRules(),
    ],
    (facts) => ({
      valid: true,
      normalizedTags: [...facts.normalizedTags],
      dominantTags: [...facts.dominantTags],
      recipeTags: [...facts.recipeTags],
      notes: [],
      reasons: [],
      warnings: [],
      trace: [],
    }),
  );

  evaluate(facts: MaterialFacts): MaterialDecision {
    return this.ruleSet.evaluate(facts, {
      metadata: {
        phase: CREATION_RULE_PHASES.MATERIAL_VALIDATION,
      },
    });
  }
}