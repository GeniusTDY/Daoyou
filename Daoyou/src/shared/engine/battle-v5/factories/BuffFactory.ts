import { DataDrivenBuff } from '../buffs/DataDrivenBuff';
import { Buff } from '../buffs/Buff';
import { BuffConfig, EffectConfig, ListenerConfig } from '../core/configs';
import { buildListenerRuntimeConfig } from '../core/listenerExecution';
import { GameplayEffect } from '../effects/Effect';
import { AbilityFactory } from './AbilityFactory';

/**
 * BUFF
 *
 *
 * -  BuffConfig  DataDrivenBuff
 * -
 */
export class BuffFactory {
  private static assertListenerContract(listener: ListenerConfig): void {
    if (!listener.scope) {
      throw new Error(
        `Listener ${listener.eventType} is missing required field: scope`,
      );
    }
  }

  /**
   *  BUFF
   */
  static create(config: BuffConfig): Buff {
    for (const modifier of config.modifiers ?? []) {
      if (modifier.scaleByLayer && modifier.valueByLayer) {
        throw new Error(`Buff ${config.id} 的 scaleByLayer 与 valueByLayer 不能同时配置`);
      }
      if (modifier.valueByLayer && modifier.valueByLayer.length === 0) {
        throw new Error(`Buff ${config.id} 的 valueByLayer 不能为空数组`);
      }
    }
    const buff = new DataDrivenBuff(config);

    // 1.  Buff
    if (config.tags) {
      buff.tags.addTags(config.tags);
    }

    // 2.
    if (config.listeners) {
      for (const [listenerIndex, listener] of config.listeners.entries()) {
        this.assertListenerContract(listener);
        const instantiatedEffects = listener.effects
          .map((effCfg) => {
            const effect = this.createEffect(effCfg);
            return effect ? { effect, globalUnique: effCfg.globalUnique } : null;
          })
          .filter((e) => e !== null);
        buff.addInstantiatedListener(
          buildListenerRuntimeConfig(
            listener,
            `${config.id}:buff:${listenerIndex}`,
          ),
          instantiatedEffects,
        );
      }
    }

    return buff;
  }

  /**
   *
   *  AbilityFactory
   */
  static createEffect(cfg: EffectConfig): GameplayEffect | null {
    return AbilityFactory.createEffect(cfg);
  }
}
