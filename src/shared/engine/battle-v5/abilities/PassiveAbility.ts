// engine/battle-v5/abilities/PassiveAbility.ts

import { Ability } from './Ability';
import { AbilityId, AbilityType, CombatEvent } from '../core/types';

/**
 *
 *
 *
 * -
 * -
 * -
 *
 *
 * 1.  → constructor()
 * 2.  → setOwner()
 * 3.  → setActive(true) → setupEventListeners()
 * 4.  →  createEventHandler
 * 5.  → setActive(false) →
 */
export abstract class PassiveAbility extends Ability {
  constructor(id: AbilityId, name: string) {
    super(id, name, AbilityType.PASSIVE_SKILL);
  }

  // =====  =====

  protected override onActivate(): void {
    super.onActivate();
    this.setupEventListeners();
  }

  /**
   *
   *
   *
   * ```ts
   * protected setupEventListeners(): void {
   *   this.subscribeEvent(
   *     'DamageSegmentAppliedEvent',
   *     this.createEventHandler((e) => this.onDamageTaken(e))
   *   );
   * }
   * ```
   */
  protected abstract setupEventListeners(): void;

  // =====  =====

  /**
   *
   *
   *  listener guard
   */
  protected createEventHandler<T extends CombatEvent>(
    handler: (event: T) => void
  ): (event: T) => void {
    return (event: T) => {
      const owner = this.getOwner();
      if (!owner) return;
      handler(event);
    };
  }

  // =====  execute  =====

  
  override canTrigger(): boolean {
    return true;
  }

  /**
   *  execute
   *
   */
  override execute(): void {
    // 默认空实现
  }

  // =====  =====

  override clone(): PassiveAbility {
    const cloned = super.clone() as PassiveAbility;
    return cloned;
  }
}
