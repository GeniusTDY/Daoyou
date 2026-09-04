import { Rule } from '../core';
import { AffixEligibilityFacts, AffixPoolDecision } from '../contracts';
import { CREATION_AFFIX_POOL_SCORING } from '../../config/CreationBalance';

/*
 * AffixWeightRules:
 *
 */
/*
 * AffixWeightRules:  admission score
 *  Picker  diagnostics
 */
export class AffixWeightRules
  implements Rule<AffixEligibilityFacts, AffixPoolDecision>
{
  readonly id = 'affix.pool.weight';

  apply({ facts, decision }: Parameters<Rule<AffixEligibilityFacts, AffixPoolDecision>['apply']>[0]): void {
    const accepted = [] as AffixPoolDecision['candidates'];
    const inputTagSet = new Set(
      facts.inputTagSignals.map((signal) => signal.tag),
    );

    for (const candidate of decision.candidates) {
      const tagHitCount = candidate.tags.reduce(
        (sum, tag) => sum + (inputTagSet.has(tag) ? 1 : 0),
        0,
      );
      const coverage =
        candidate.tags.length > 0 ? tagHitCount / candidate.tags.length : 0;

      if (candidate.weight <= 0) {
        decision.rejectedCandidates.push({
          affixId: candidate.id,
          reason: 'non_positive_weight',
          slot: candidate.slot,
        });
        decision.warnings.push({
          code: 'affix_non_positive_weight',
          message: '检测到非正权重词缀，已跳过',
          details: {
            affixId: candidate.id,
            weight: candidate.weight,
          },
        });
        continue;
      }

      const evaluationScore = candidate.evaluationScore ?? 1;

      //  4
      const scoreMultiplier = 0.8 + 0.4 * evaluationScore;
      const tagBonus =
        1 +
        Math.max(0, tagHitCount - 1) *
          (CREATION_AFFIX_POOL_SCORING.tagHitBonus * 0.5) +
        coverage * (CREATION_AFFIX_POOL_SCORING.coverageBonus * 0.3);
      const negativeBiasPenalty = this.calculateNegativeBiasPenalty(
        candidate.tags,
        facts.negativeTagBiases,
      );
      const penaltyMultiplier = Math.max(0.35, 1 - negativeBiasPenalty);

      const weighted = Math.max(
        1,
        Math.round(
          candidate.weight * scoreMultiplier * tagBonus * penaltyMultiplier,
        ),
      );

      accepted.push({
        ...candidate,
        weight: weighted,
      });
    }

    decision.candidates = accepted;
    decision.trace.push({
      ruleId: this.id,
      outcome: 'applied',
      message: '完成候选权重合法性过滤',
      details: {
        accepted: accepted.length,
      },
    });
  }

  private calculateNegativeBiasPenalty(
    candidateTags: string[],
    negativeBiases: AffixEligibilityFacts['negativeTagBiases'],
  ): number {
    if (!negativeBiases?.length) {
      return 0;
    }

    const totalMatchedWeight = negativeBiases.reduce((sum, bias) => {
      return candidateTags.includes(bias.tag) ? sum + bias.weight : sum;
    }, 0);

    return Math.min(0.65, totalMatchedWeight * 0.2);
  }
}
