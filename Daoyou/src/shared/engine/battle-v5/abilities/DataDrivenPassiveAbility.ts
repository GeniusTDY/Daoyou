import { PassiveAbility } from './PassiveAbility';
import { AbilityId, AttributeModifier, CombatEvent } from '../core/types';
import { AttributeModifierConfig, GlobalUniqueConfig } from '../core/configs';
import {
  claimGlobalUniqueEffect,
  releaseGlobalUniqueEffects,
} from '../core/runtimeState';
import {
  GameplayEffect,
  EffectExecutionContextV3,
  executeGameplayEffectV3,
} from '../effects/Effect';
import {
  ListenerRuntimeConfig,
  resolveListenerContext,
  shouldExecuteListener,
} from '../core/listenerExecution';

/**
 *  (Data-Driven Passive Ability)
 *
 *
 * -  (EDA)
 * -  (GAS)
 */
export class DataDrivenPassiveAbility extends PassiveAbility {
  
  private _instantiatedListeners: Array<{
    runtime: ListenerRuntimeConfig;
    effects: InstantiatedGameplayEffect[];
  }> = [];
  private _modifiers: AttributeModifierConfig[] = [];

  constructor(id: AbilityId, name: string) {
    super(id, name);
  }

  addInstantiatedListener(
    runtime: ListenerRuntimeConfig,
    effects: InstantiatedGameplayEffect[],
  ): void {
    this._instantiatedListeners.push({ runtime, effects });
  }

  addModifier(config: AttributeModifierConfig): void {
    this._modifiers.push(config);
  }

  protected override onActivate(): void {
    const owner = this.getOwner();

    if (owner) {
      for (const [index, modifier] of this._modifiers.entries()) {
        const mountedModifier: AttributeModifier = {
          id: `${this.id}_${modifier.attrType}_${index}`,
          attrType: modifier.attrType,
          type: modifier.type,
          value: modifier.value,
          source: this,
        };
        owner.attributes.addModifier(mountedModifier);
      }
      owner.updateDerivedStats();
    }

    super.onActivate();
  }

  protected override onDeactivate(): void {
    const owner = this.getOwner();
    if (owner) {
      owner.attributes.removeModifierBySource(this);
      owner.updateDerivedStats();
    }

    super.onDeactivate();
    if (owner) {
      releaseGlobalUniqueEffects(owner, this);
    }
  }

  
  protected override setupEventListeners(): void {
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
        this.createEventHandler((event: CombatEvent) => {
          this._executeInstantiatedEffects(listener.runtime, mountedEffects, event);
        }),
        listener.runtime.priority,
      );
    }
  }

  private _executeInstantiatedEffects(
    runtime: ListenerRuntimeConfig,
    effects: InstantiatedGameplayEffect[],
    event: CombatEvent,
  ): void {
    const owner = this.getOwner();
    if (!owner) return;

    if (!shouldExecuteListener(owner, event, runtime, this)) {
      return;
    }

    const resolved = resolveListenerContext(owner, event, runtime.mapping);

    const context = EffectExecutionContextV3.passiveAbility({
      owner,
      caster: resolved.caster,
      target: resolved.target,
      ability: this,
      triggerEvent: event, // 关键：注入触发事件
      resolution: event.resolution,
    });

    for (const { effect } of effects) {
      executeGameplayEffectV3(effect, context);
    }
  }

  
  protected setupListeners(): void {}

  override clone(): DataDrivenPassiveAbility {
    const cloned = new DataDrivenPassiveAbility(this.id, this.name);
    
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
    for (const modifier of this._modifiers) {
      cloned.addModifier({ ...modifier });
    }
    return cloned;
  }
}

export interface InstantiatedGameplayEffect {
  effect: GameplayEffect;
  globalUnique?: GlobalUniqueConfig;
}
