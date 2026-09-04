import { checkConditions } from '../core/conditionEvaluator';
import { ConditionConfig, EffectConfig } from '../core/configs';
import { EffectExecutionContextV3, GameplayEffect } from '../effects/Effect';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EffectConstructor = (params: any) => GameplayEffect;

/**
 *
 *  GE
 */
export class EffectRegistry {
  private static instance: EffectRegistry;
  private registry: Map<string, EffectConstructor> = new Map();

  private constructor() {}

  static getInstance(): EffectRegistry {
    if (!EffectRegistry.instance) {
      EffectRegistry.instance = new EffectRegistry();
    }
    return EffectRegistry.instance;
  }

  
  register(type: string, constructor: EffectConstructor): void {
    this.registry.set(type, constructor);
  }

  
  create(config: EffectConfig): GameplayEffect | null {
    const constructor = this.registry.get(config.type);
    if (!constructor) {
      const message = `EffectRegistry: 未找到类型为 ${config.type} 的效果注册`;
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(message);
      }
      console.warn(message);
      return null;
    }

    const baseEffect = constructor(config.params);

    
    if (config.conditions && config.conditions.length > 0) {
      return this.wrapWithConditions(baseEffect, config.conditions);
    }

    return baseEffect;
  }

  /**
   *  ()
   */
  private wrapWithConditions(
    effect: GameplayEffect,
    conditions: ConditionConfig[],
  ): GameplayEffect {
    return {
      execute: (context: EffectExecutionContextV3) => {
        if (this.checkConditions(context, conditions)) {
          effect.execute(context);
        }
      },
    } as GameplayEffect;
  }

  
  private checkConditions(
    context: EffectExecutionContextV3,
    conditions: ConditionConfig[],
  ): boolean {
    return checkConditions(context, conditions);
  }
}
