import { CREATION_PROJECTION_BALANCE } from '../../config/CreationBalance';
import { Rule } from '../core/Rule';
import { RuleContext } from '../core/RuleContext';
import { CompositionDecision } from '../contracts/CompositionDecision';
import { CompositionFacts } from '../contracts/CompositionFacts';

/**
 * EnergyConversionRules
 *  decision.energyConversion
 *  active_skill passive  no-op
 * mpCost/cooldown  projection effects ProjectionRules
 */
export class EnergyConversionRules
  implements Rule<CompositionFacts, CompositionDecision>
{
  readonly id = 'composition.energy_conversion';

  apply({ facts, decision }: RuleContext<CompositionFacts, CompositionDecision>): void {
    if (facts.productType !== 'skill') return;

    const { affixes } = facts;
    const priority =
      CREATION_PROJECTION_BALANCE.skillPriorityBase + affixes.length;

    decision.energyConversion = { priority };

    decision.trace.push({
      ruleId: this.id,
      outcome: 'applied',
      message: `技能排序权重：priority=${priority}`,
    });
  }
}
