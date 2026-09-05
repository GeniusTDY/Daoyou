import { BuffConfig, GlobalUniqueConfig } from '../core/configs';
import {
  ListenerRuntimeConfig,
  resolveListenerContext,
  shouldExecuteListener,
} from '../core/listenerExecution';
import {
  claimGlobalUniqueEffect,
  releaseGlobalUniqueEffects,
  shouldTickBuffDuration,
} from '../core/runtimeState';
import { BuffId, CombatEvent } from '../core/types';
import {
  GameplayEffect,
  EffectExecutionContextV3,
  executeGameplayEffectV3,
} from '../effects/Effect';
import { Buff } from './Buff';

/**
 *  BUFF (Data-Driven Buff)
 *
 *
 * -
 * -
 * -
 */
export class DataDrivenBuff extends Buff {
  private _config: BuffConfig;
  private _instantiatedListeners: Array<{
    runtime: ListenerRuntimeConfig;
    effects: InstantiatedGameplayEffect[];
  }> = [];

  constructor(config: BuffConfig) {
    super(
      config.id as BuffId,
      config.name,
      config.type,
      config.duration,
      config.stackRule,
      config.description,
      config.maxLayers,
      config.logVisibility,
      config.dispelPolicy,
      config.countsAsStatus ?? true,
      config.statusVisibility,
      config.stackPriority,
      config.dispelMode,
      config.removeOnDeath,
      config.durationUnit,
    );
    this._config = config;
  }

  getConfig(): BuffConfig {
    return this._config;
  }

  addInstantiatedListener(
    runtime: ListenerRuntimeConfig,
    effects: InstantiatedGameplayEffect[],
  ): void {
    this._instantiatedListeners.push({ runtime, effects });
  }

  override onActivate(): void {
    super.onActivate();
    if (!this._owner) return;

    // 1.
    if (this._config.statusTags) {
      this._owner.tags.addTags(this._config.statusTags);
    }

    // 2.
    this._mountAttributeModifiers();

    // 3.
    this._setupEventListeners();
  }

  override onLayerChanged(): void {
    if (!this._owner) return;
    for (const [index, modifier] of (this._config.modifiers ?? []).entries()) {
      if (!modifier.scaleByLayer && !modifier.valueByLayer) continue;
      this._owner.attributes.removeModifier(this._attributeModifierId(index));
      this._mountAttributeModifier(index);
    }
    this._owner.updateDerivedStats();
  }

  private _mountAttributeModifiers(): void {
    if (!this._owner || !this._config.modifiers) return;
    for (const [index] of this._config.modifiers.entries()) {
      this._mountAttributeModifier(index);
    }
  }

  private _mountAttributeModifier(index: number): void {
    if (!this._owner) return;
    const modifier = this._config.modifiers?.[index];
    if (!modifier) return;
    this._owner.attributes.addModifier({
      id: this._attributeModifierId(index),
      attrType: modifier.attrType,
      type: modifier.type,
      value: this._modifierValue(modifier),
      source: this,
    });
  }

  private _modifierValue(
    modifier: NonNullable<BuffConfig['modifiers']>[number],
  ): number {
    if (modifier.valueByLayer?.length) {
      return modifier.valueByLayer[
        Math.min(this.getLayer(), modifier.valueByLayer.length) - 1
      ];
    }
    return modifier.value * (modifier.scaleByLayer ? this.getLayer() : 1);
  }

  private _attributeModifierId(index: number): string {
    return `${this.id}:modifier:${index}`;
  }

  private _setupEventListeners(): void {
    if (!this._owner) return;

    for (const listener of this._instantiatedListeners) {
      const mountedEffects = listener.effects.filter((entry) => {
        const key = entry.globalUnique?.key;
        return !key || claimGlobalUniqueEffect(this._owner!, key, this);
      });
      if (mountedEffects.length === 0) {
        continue;
      }

      this._subscribeEvent<CombatEvent>(
        listener.runtime.eventType,
        (event) =>
          this._executeEffects(listener.runtime, mountedEffects, event),
        listener.runtime.priority,
      );
    }
  }

  private _executeEffects(
    runtime: ListenerRuntimeConfig,
    effects: InstantiatedGameplayEffect[],
    event: CombatEvent,
  ): void {
    if (!this._owner) return; 

    //  Buff “”
    if (
      event.type === 'RoundPostEvent' &&
      this.durationUnit === 'round' &&
      !shouldTickBuffDuration(this._owner, this)
    ) {
      return;
    }

    if (!shouldExecuteListener(this._owner, event, runtime, this)) {
      return;
    }

    const resolved = resolveListenerContext(
      this._owner,
      event,
      runtime.mapping,
    );

    const attribution = this.getCombatAttributionV3();
    if (!attribution) {
      throw new Error(`Buff ${this.id} has no CombatAttributionV3`);
    }
    const context = EffectExecutionContextV3.buff({
      owner: attribution.owner,
      caster: resolved.caster,
      target: resolved.target,
      triggerEvent: event, // 关键：注入触发事件
      buff: this,
      resolution: event.resolution,
    });

    for (const { effect } of effects) {
      executeGameplayEffectV3(effect, context);
    }
  }

  override onDeactivate(reason?: import('./Buff').BuffDeactivateReason): void {
    if (this._owner) {
      // 1.
      if (this._config.statusTags) {
        this._owner.tags.removeTags(this._config.statusTags);
      }

      // 2.  ( source )
      this._owner.attributes.removeModifierBySource(this);
      releaseGlobalUniqueEffects(this._owner, this);
    }

    super.onDeactivate(reason);
  }

  override clone(): DataDrivenBuff {
    const cloned = new DataDrivenBuff(this._config);
    cloned.tags = this.tags.clone();
    cloned.setDuration(this.getDuration());
    cloned.setLayer(this.getLayer());
    
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
