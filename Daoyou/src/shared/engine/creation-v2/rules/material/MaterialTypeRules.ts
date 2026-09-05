import { CreationTags } from '@shared/engine/shared/tag-domain';
import { Rule } from '../core';
import { RuleContext } from '../core/RuleContext';
import { MaterialDecision } from '../contracts/MaterialDecision';
import { MaterialFacts } from '../contracts/MaterialFacts';

/**
 * MaterialTypeRules
 *
 *
 *  MaterialDecision  normalizedTags  RuleTrace
 *
 *  normalizedTags MaterialFactsBuilder
 *  trace
 */
/*
 * MaterialTypeRules: // RuleTrace
 */
export class MaterialTypeRules implements Rule<MaterialFacts, MaterialDecision> {
  readonly id = 'material.type-tags';

  apply({ facts, decision }: RuleContext<MaterialFacts, MaterialDecision>): void {
    if (facts.fingerprints.length === 0) {
      decision.trace.push({
        ruleId: this.id,
        outcome: 'skipped',
        message: '无材料指纹，跳过类型标签溯源',
      });
      return;
    }

    for (const fp of facts.fingerprints) {
      const typeTags = fp.explicitTags.filter(
        (t) =>
          t.startsWith(CreationTags.MATERIAL.TYPE) ||
          t.startsWith(CreationTags.MATERIAL.QUALITY) ||
          t.startsWith(CreationTags.MATERIAL.ELEMENT),
      );

      decision.trace.push({
        ruleId: this.id,
        outcome: 'applied',
        message: `材料「${fp.materialName}」(${fp.materialType}) 贡献 ${typeTags.length} 个显式类型标签`,
        details: {
          materialName: fp.materialName,
          materialType: fp.materialType,
          typeTags,
        },
      });
    }
  }
}
