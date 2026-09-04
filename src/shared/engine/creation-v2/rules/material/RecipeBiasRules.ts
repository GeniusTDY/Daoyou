import { CreationTags } from '@shared/engine/shared/tag-domain';
import { Rule } from '../core';
import { RuleContext } from '../core/RuleContext';
import { MaterialDecision } from '../contracts/MaterialDecision';
import { MaterialFacts } from '../contracts/MaterialFacts';

/**
 * RecipeBiasRules
 *
 *  MaterialTagNormalizer.normalizeRecipeTags
 *  MaterialDecision  RuleTrace
 *
 *  recipeTags MaterialFactsBuilder  trace
 * UTILITY warning
 */
export class RecipeBiasRules implements Rule<MaterialFacts, MaterialDecision> {
  readonly id = 'material.recipe-bias';

  apply({ facts, decision }: RuleContext<MaterialFacts, MaterialDecision>): void {
    if (facts.fingerprints.length === 0) {
      decision.trace.push({
        ruleId: this.id,
        outcome: 'skipped',
        message: '无材料指纹，跳过配方偏向标签溯源',
      });
      return;
    }

    let hasWeakBias = false;

    for (const fp of facts.fingerprints) {
      if (fp.recipeTags.length === 0) {
        decision.trace.push({
          ruleId: this.id,
          outcome: 'skipped',
          message: `材料「${fp.materialName}」(${fp.materialType}) 无配方偏向标签`,
          details: { materialName: fp.materialName, materialType: fp.materialType },
        });
        hasWeakBias = true;
        continue;
      }

      const isOnlyUtility = fp.recipeTags.every(
        (t) => t === CreationTags.RECIPE.PRODUCT_BIAS_UTILITY,
      );

      if (isOnlyUtility) {
        hasWeakBias = true;
      }

      decision.trace.push({
        ruleId: this.id,
        outcome: 'applied',
        message: `材料「${fp.materialName}」(${fp.materialType}) 贡献 ${fp.recipeTags.length} 个配方偏向标签`,
        details: {
          materialName: fp.materialName,
          materialType: fp.materialType,
          recipeTags: fp.recipeTags,
          isOnlyUtility,
        },
      });
    }

    if (hasWeakBias) {
      decision.warnings.push({
        code: 'weak_recipe_bias',
        message:
          '部分材料仅包含通用配方偏向标签（UTILITY）或无配方偏向，产物类型推断可能不精确',
      });
    }
  }
}
