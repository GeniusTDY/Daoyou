// engine/battle-v5/abilities/BasicAttack.ts
import { GameplayTags } from '@shared/engine/shared/tag-domain';
import { AbilityId, AttributeType } from '../core/types';
import { DamageEffect } from '../effects/DamageEffect';
import {
  EffectExecutionContextV3,
  executeGameplayEffectV3,
} from '../effects/Effect';
import { Unit } from '../units/Unit';
import { ActiveSkill } from './ActiveSkill';


export class BasicAttack extends ActiveSkill {
  private _damageEffect: DamageEffect;

  constructor() {
    super('basic_attack' as AbilityId, '普攻', {
      mpCost: 0,
      cooldown: 0,
      priority: 0,
    });

    // 1.0
    this._damageEffect = new DamageEffect({
      value: {
        attribute: AttributeType.ATK,
        coefficient: 0.8,
      },
    });

    this.tags.addTags([
      GameplayTags.ABILITY.CHANNEL.PHYSICAL,
      GameplayTags.ABILITY.KIND.BASIC,
    ]);
  }

  
  protected executeSkill(caster: Unit, target: Unit): void {
    const context = EffectExecutionContextV3.activeAbility({
      owner: caster,
      caster,
      target,
      ability: this,
      resolution: this.resolution,
    });
    executeGameplayEffectV3(this._damageEffect, context);
  }
}
