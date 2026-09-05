import { GameplayEffect, EffectExecutionContextV3 } from './Effect';
import { ValueCalculator } from '../core/ValueCalculator';
import { EffectRegistry } from '../factories/EffectRegistry';
import { ShieldParams } from '../core/configs';
import { ShieldEvent } from '../core/events';


export class ShieldEffect extends GameplayEffect {
  constructor(private params: ShieldParams) {
    super();
  }

  execute(context: EffectExecutionContextV3): void {
    const { caster, ability } = context;
    const target = this.params.target === 'caster' ? caster : context.target;

    
    const shieldAmount = ValueCalculator.calculate(this.params.value, caster, target);

    if (shieldAmount <= 0) return;

    
    const before = target.getCurrentShield();
    target.addShield(shieldAmount);
    const applied = target.getCurrentShield() - before;
    if (applied > 0) {
      context.commit(target, {
        type: 'shield',
        amount: Math.round(applied),
        after: Math.round(target.getCurrentShield()),
      });
    }

    
    context.emit<ShieldEvent>({
      type: 'ShieldEvent',
      timestamp: context.owner.runtime.clock.now(),
      caster,
      target,
      ability,
      shieldAmount,
    });
  }
}


EffectRegistry.getInstance().register('shield', (params) => new ShieldEffect(params));
