import { GameplayEffect, EffectExecutionContextV3 } from './Effect';
import { DamageSegmentRequestedEvent, DamageSegmentAppliedEvent } from '../core/events';
import { EffectRegistry } from '../factories/EffectRegistry';
import { ReflectParams } from '../core/configs';
import { DamageSource } from '../core';
import { claimActionAmount } from '../core/runtimeState';
import { requireResolution } from '../core/resolution';


export class ReflectEffect extends GameplayEffect {
  constructor(private params: ReflectParams) {
    super();
  }

  execute(context: EffectExecutionContextV3): void {
    const { triggerEvent, target } = context;

    
    if (!triggerEvent || triggerEvent.type !== 'DamageSegmentAppliedEvent') {
      return;
    }

    const damageTakenEvent = triggerEvent as DamageSegmentAppliedEvent;

    
    if (
      damageTakenEvent.damageSource === DamageSource.REFLECT ||
      damageTakenEvent.damageSource === DamageSource.COUNTER ||
      damageTakenEvent.damageSource === DamageSource.FOLLOW_UP ||
      damageTakenEvent.damageSource === DamageSource.DELAYED
    ) {
      return;
    }

    const layer = this.params.layerBuffId
      ? target.buffs.getAllBuffs().find((buff) => buff.id === this.params.layerBuffId)?.getLayer() ?? 0
      : 0;
    const raw = Math.round(
      damageTakenEvent.damageTaken *
        (this.params.ratio + layer * (this.params.ratioPerLayer ?? 0)),
    );
    const attacker = damageTakenEvent.caster;
    const damageToReflect = this.params.maxHpRatioPerAction
      ? claimActionAmount(
          attacker ?? target,
          `reflect:${target.id}:${this.params.layerBuffId ?? 'generic'}`,
          raw,
          Math.round(target.getMaxHp() * this.params.maxHpRatioPerAction),
        )
      : raw;

    if (damageToReflect <= 0) return;

    
    if (attacker && attacker.isAlive()) {
      context.emit<DamageSegmentRequestedEvent>({
        type: 'DamageSegmentRequestedEvent',
        resolution: requireResolution(context),
      timestamp: context.owner.runtime.clock.now(),
        caster: target,
        target: attacker,
        damageSource: DamageSource.REFLECT,
        damageType: damageTakenEvent.damageType, // 反伤的伤害类型与原伤害相同
        baseDamage: damageToReflect,
        finalDamage: damageToReflect,
      });
    }
  }
}


EffectRegistry.getInstance().register('reflect', (params) => new ReflectEffect(params));
