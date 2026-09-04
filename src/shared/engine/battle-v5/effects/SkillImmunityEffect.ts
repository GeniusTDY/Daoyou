import type { SkillImmunityParams } from '../core/configs';
import type { SkillPreCastEvent } from '../core/events';
import { EffectRegistry } from '../factories/EffectRegistry';
import { EffectExecutionContextV3, GameplayEffect } from './Effect';

/**
 *
 *
 *  buff_immunity / damage_immunity
 *  SkillPreCastEvent  ActionExecutionSystem
 * Buff
 */
export class SkillImmunityEffect extends GameplayEffect {
  constructor(private readonly params: SkillImmunityParams) {
    super();
  }

  execute(context: EffectExecutionContextV3): void {
    const event = context.triggerEvent;
    if (!event || event.type !== 'SkillPreCastEvent') return;

    const skillEvent = event as SkillPreCastEvent;
    if (skillEvent.isImmune) return;
    // “”
    if (skillEvent.caster.teamId === skillEvent.target.teamId) return;

    skillEvent.isImmune = true;
    skillEvent.isInterrupted = true;
    skillEvent.immunityReason = this.params.reason;
  }
}

EffectRegistry.getInstance().register(
  'skill_immunity',
  (params) => new SkillImmunityEffect(params),
);
