import { ActiveSkill } from '../abilities/ActiveSkill';
import { CooldownModifyParams } from '../core/configs';
import { CooldownModifyEvent } from '../core/events';
import { EffectRegistry } from '../factories/EffectRegistry';
import { CombatMechanicCodeV3 } from '../v3/mechanics';
import { EffectExecutionContextV3, GameplayEffect } from './Effect';


export class CooldownModifyEffect extends GameplayEffect {
  constructor(private params: CooldownModifyParams) {
    super();
  }

  execute(context: EffectExecutionContextV3): void {
    const rounds = Math.round(this.params.cdModifyValue);
    if (rounds === 0) return;
    const { target, caster, ability } = context;
    const recipient = this.params.target === 'caster' ? caster : target;
    const abilities = recipient.abilities.getAllAbilities();
    const matchedSkills = abilities.filter(
      (skill): skill is ActiveSkill =>
        skill instanceof ActiveSkill &&
        (this.params.includeCurrent || ability !== skill) &&
        (!this.params.tags || skill.tags.hasAnyTag(this.params.tags)),
    );
    const countToModify =
      this.params.maxCount === undefined
        ? matchedSkills.length
        : Math.min(
            matchedSkills.length,
            Math.max(0, Math.floor(this.params.maxCount)),
          );

    for (let i = 0; i < countToModify; i++) {
      if (!context.canExecuteEffect()) break;
      const skill = matchedSkills[i];

      //  ActiveSkill
      skill.modifyCooldown(rounds);

      context.commit(recipient, {
        type: 'mechanic',
        code: CombatMechanicCodeV3.COOLDOWN_MODIFY,
        payload: {
          kind: 'cooldown_change',
          abilityName: skill.name,
          rounds,
        },
      });

      
      context.emit<CooldownModifyEvent>({
        type: 'CooldownModifyEvent',
      timestamp: context.owner.runtime.clock.now(),
        caster,
        target: recipient,
        ability,
        cdModifyValue: rounds,
        affectedAbilityName: skill.name,
      });
    }
  }
}


EffectRegistry.getInstance().register(
  'cooldown_modify',
  (params) => new CooldownModifyEffect(params),
);
