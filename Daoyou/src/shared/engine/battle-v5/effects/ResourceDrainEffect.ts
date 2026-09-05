import { ResourceDrainParams } from '../core/configs';
import { DamageSegmentAppliedEvent, ResourceDrainEvent } from '../core/events';
import { EffectRegistry } from '../factories/EffectRegistry';
import { EffectExecutionContextV3, GameplayEffect } from './Effect';

/**
 *  (/)
 *
 */
export class ResourceDrainEffect extends GameplayEffect {
  constructor(private params: ResourceDrainParams) {
    super();
  }

  execute(context: EffectExecutionContextV3): void {
    const { caster, target, ability, triggerEvent } = context;

    
    if (!triggerEvent || triggerEvent.type !== 'DamageSegmentAppliedEvent') {
      return;
    }

    const damageEvent = triggerEvent as DamageSegmentAppliedEvent;
    const amount = Math.round(damageEvent.damageTaken * this.params.ratio);

    if (amount <= 0) return;

    const appliedAmount = this.params.targetType === 'hp'
      ? caster.heal(amount)
      : caster.restoreMp(amount);
    if (appliedAmount <= 0) return;

    context.commit(caster, {
      type: 'recovery',
      resource: this.params.targetType,
      amount: Math.round(appliedAmount),
      after: Math.round(
        this.params.targetType === 'hp'
          ? caster.getCurrentHp()
          : caster.getCurrentMp(),
      ),
    });

    
    context.emit<ResourceDrainEvent>({
      type: 'ResourceDrainEvent',
      timestamp: context.owner.runtime.clock.now(),
      caster,
      target,
      ability,
      drainType: this.params.targetType,
      amount: appliedAmount,
    });
  }
}


EffectRegistry.getInstance().register(
  'resource_drain',
  (params) => new ResourceDrainEffect(params),
);
