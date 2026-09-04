import { GlobalUniqueConfig } from '../core/configs';
import {
  ListenerRuntimeConfig,
  resolveListenerContext,
  shouldExecuteListener,
} from '../core/listenerExecution';
import {
  claimGlobalUniqueEffect,
  releaseGlobalUniqueEffects,
} from '../core/runtimeState';
import { AbilityId, CombatEvent } from '../core/types';
import {
  EffectExecutionContextV3,
  executeGameplayEffectV3,
  GameplayEffect,
} from '../effects/Effect';
import { Unit } from '../units/Unit';
import { ActiveSkill, ActiveSkillConfig } from './ActiveSkill';

/**
 *  (Data-Driven Active Skill)
 *
 *
 * -  (GameplayEffect)
 * -
 * -  GAS
 */
export class DataDrivenActiveSkill extends ActiveSkill {
  private _effects: GameplayEffect[] = [];
  private _castEffects: GameplayEffect[] = [];
  private _instantiatedListeners: Array<{
    runtime: ListenerRuntimeConfig;
    effects: InstantiatedGameplayEffect[];
  }> = [];

  constructor(id: AbilityId, name: string, config: ActiveSkillConfig = {}) {
    super(id, name, config);
  }

  /**
   *
   * @param effect
   */
  addEffect(effect: GameplayEffect): void {
    this._effects.push(effect);
  }

  addCastEffect(effect: GameplayEffect): void {
    this._castEffects.push(effect);
  }

  addInstantiatedListener(
    runtime: ListenerRuntimeConfig,
    effects: InstantiatedGameplayEffect[],
  ): void {
    this._instantiatedListeners.push({ runtime, effects });
  }

  protected override onActivate(): void {
    super.onActivate();
    const owner = this.getOwner();
    if (!owner) return;

    for (const listener of this._instantiatedListeners) {
      const mountedEffects = listener.effects.filter((entry) => {
        const key = entry.globalUnique?.key;
        return !key || claimGlobalUniqueEffect(owner, key, this);
      });
      if (mountedEffects.length === 0) {
        continue;
      }

      this.subscribeEvent(
        listener.runtime.eventType,
        (event: CombatEvent) => {
          this._executeInstantiatedEffects(
            listener.runtime,
            mountedEffects,
            event,
          );
        },
        listener.runtime.priority,
      );
    }
  }

  protected override onDeactivate(): void {
    const owner = this.getOwner();
    if (owner) {
      releaseGlobalUniqueEffects(owner, this);
    }
    super.onDeactivate();
  }

  
  protected executeSkill(caster: Unit, target: Unit): void {
    const context = EffectExecutionContextV3.activeAbility({
      owner: caster,
      caster,
      target,
      ability: this,
      castSnapshot: this.castSnapshot,
      resolution: this.resolution,
    });

    
    for (const effect of this._effects) {
      if (!context.canExecuteEffect()) break;
      executeGameplayEffectV3(effect, context);
    }
  }

  protected override executeCastEffects(caster: Unit, target: Unit): void {
    const context = EffectExecutionContextV3.activeAbility({
      owner: caster,
      caster,
      target,
      ability: this,
      castSnapshot: this.castSnapshot,
      resolution: this.resolution,
    });
    for (const effect of this._castEffects) {
      if (!context.canExecuteEffect()) break;
      executeGameplayEffectV3(effect, context);
    }
  }

  private _executeInstantiatedEffects(
    runtime: ListenerRuntimeConfig,
    effects: InstantiatedGameplayEffect[],
    event: CombatEvent,
  ): void {
    const owner = this.getOwner();
    if (!owner) {
      return;
    }

    const eventAbility = (event as CombatEvent & { ability?: { id?: string } })
      .ability;
    if (eventAbility && eventAbility !== this) {
      return;
    }

    if (!shouldExecuteListener(owner, event, runtime, this)) {
      return;
    }

    const resolved = resolveListenerContext(owner, event, runtime.mapping);
    const context = EffectExecutionContextV3.passiveAbility({
      owner,
      caster: resolved.caster,
      target: resolved.target,
      ability: this,
      triggerEvent: event,
      resolution: event.resolution,
    });

    for (const { effect } of effects) {
      executeGameplayEffectV3(effect, context);
    }
  }

  
  override clone(): DataDrivenActiveSkill {
    const cloned = new DataDrivenActiveSkill(this.id, this.name, {
      description: this.description,
      costs: this.costConfigs,
      cooldown: this.maxCooldown,
      priority: this.priority,
      targetPolicy: this.targetPolicy,
      selectionProfile: this.selectionProfile,
      castConditions: this.castConditions,
      hitPolicy: this.hitPolicy,
    });
    cloned.tags.addTags(this.tags.getTags());
    if (this.currentCooldown > 0) cloned.modifyCooldown(this.currentCooldown);
    cloned._effects = [...this._effects];
    cloned._castEffects = [...this._castEffects];
    for (const listener of this._instantiatedListeners) {
      cloned.addInstantiatedListener(
        {
          ...listener.runtime,
          mapping: { ...listener.runtime.mapping },
          guard: { ...listener.runtime.guard },
          triggerPolicy: listener.runtime.triggerPolicy
            ? { ...listener.runtime.triggerPolicy }
            : undefined,
          conditions: listener.runtime.conditions?.map((condition) => ({
            ...condition,
            params: { ...condition.params },
          })),
        },
        [...listener.effects],
      );
    }
    return cloned;
  }
}

export interface InstantiatedGameplayEffect {
  effect: GameplayEffect;
  globalUnique?: GlobalUniqueConfig;
}
