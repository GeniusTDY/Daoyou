import { Rule } from '../core';
import { RuleContext } from '../core/RuleContext';
import { MaterialDecision } from '../contracts/MaterialDecision';
import { MaterialFacts } from '../contracts/MaterialFacts';

/**
 * MaterialSemanticRules
 *
 *  MaterialTagNormalizer
 *  MaterialDecision  RuleTrace
 *
 *  normalizedTags MaterialFactsBuilder
 *  trace
 *  skipped trace
 */
/*
 * MaterialSemanticRules:  MaterialTagNormalizer  RuleTrace
 */
export class MaterialSemanticRules implements Rule<MaterialFacts, MaterialDecision> {
  readonly id = 'material.semantic-tags';

  apply({ facts, decision }: RuleContext<MaterialFacts, MaterialDecision>): void {
    if (facts.fingerprints.length === 0) {
      decision.trace.push({
        ruleId: this.id,
        outcome: 'skipped',
        message: '无材料指纹，跳过语义标签溯源',
      });
      return;
    }

    for (const fp of facts.fingerprints) {
      if (fp.semanticTags.length === 0) {
        decision.trace.push({
          ruleId: this.id,
          outcome: 'skipped',
          message: `材料「${fp.materialName}」无语义标签（名称/描述未命中任何语义模式）`,
          details: { materialName: fp.materialName, materialType: fp.materialType },
        });
        continue;
      }

      decision.trace.push({
        ruleId: this.id,
        outcome: 'applied',
        message: `材料「${fp.materialName}」贡献 ${fp.semanticTags.length} 个语义标签`,
        details: {
          materialName: fp.materialName,
          semanticTags: fp.semanticTags,
        },
      });
    }
  }
}
