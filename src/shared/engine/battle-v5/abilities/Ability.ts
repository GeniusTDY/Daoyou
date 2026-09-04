import { GameplayTagContainer } from '@shared/engine/shared/tag-domain';
import type {
  AbilityCostConfig,
  AbilitySelectionProfile,
} from '../core/configs';
import { AbilityId, AbilityType, CombatEvent } from '../core/types';
import { Unit } from '../units/Unit';
import type { BattleRuntime } from '../runtime/BattleRuntime';
import type { AbilityConfig } from '../core/configs';
import type { CombatResolutionContext } from '../core/resolution';

export type { AbilityId };

type EventHandler = (event: CombatEvent) => void;

/**
 *  -  canTrigger  execute
 */
export interface AbilityContext {
  caster: Unit;
  target: Unit;
  shouldApplyEffects?: boolean;
  resolution?: CombatResolutionContext;
}

export interface AbilityCastSnapshot {
  readonly planId?: string;
  readonly target: Unit;
  readonly targetId: string;
  readonly selectionProfile?: AbilitySelectionProfile;
  readonly costs: ReadonlyArray<
    Readonly<{
      type: AbilityCostConfig['resource'];
      amount: number;
      mode?: AbilityCostConfig['mode'];
      retain?: number;
    }>
  >;
  readonly casterHpBeforeCost: number;
  readonly casterHpAfterCost: number;
  readonly casterHpRatioAfterCost: number;
  readonly casterMpBeforeCost: number;
  readonly casterMpAfterCost: number;
  readonly targetHpBeforeEffects: number;
  readonly targetHpRatioBeforeEffects: number;
}

/**
 * Ability  -  GAS
 *
 *
 * - canTrigger, execute
 * -
 * -
 *
 *
 * 1.  → constructor()
 * 2.  → setOwner()
 * 3.  → setActive(true) →  onActivate()
 * 4.  → canTrigger()  → execute()
 * 5.  → setActive(false) →  onDeactivate()
 * 6.  → destroy()
 *
 *
 * - ActiveSkill:
 * - PassiveAbility:
 */
export class Ability {
  readonly id: AbilityId;
  private readonly _baseName: string;
  private readonly _baseDescription?: string;
  readonly type: AbilityType;

  
  private _owner: Unit | null = null;
  private _runtime: BattleRuntime | null = null;
  private _serializableConfig?: AbilityConfig;
  private _active: boolean = false;
  private _priority: number = 0; 

  
  readonly tags: GameplayTagContainer;

  
  private _eventSubscriptions: Array<{
    eventType: string;
    handler: EventHandler;
  }> = [];

  constructor(
    id: AbilityId,
    name: string,
    type: AbilityType,
    description?: string,
  ) {
    this.id = id;
    this._baseName = name;
    this._baseDescription = description;
    this.type = type;
    this.tags = new GameplayTagContainer();
  }

  get name(): string {
    return this._baseName;
  }

  get description(): string | undefined {
    return this._baseDescription;
  }

  get runtimePlanId(): string | undefined {
    return undefined;
  }

  prepareCast(_context: AbilityContext): void {
    void _context;
  }

  cancelPreparedCast(): void {}

  // =====  =====

  setOwner(owner: Unit): void {
    this._owner = owner;
    this._runtime = owner.runtime;
  }

  getOwner(): Unit | null {
    return this._owner;
  }

  bindRuntime(runtime: BattleRuntime): void {
    this._runtime = runtime;
  }

  getRuntime(): BattleRuntime | null {
    return this._runtime;
  }

  setSerializableConfig(config: AbilityConfig): void {
    this._serializableConfig = config;
  }

  getSerializableConfig(): AbilityConfig | undefined {
    return this._serializableConfig;
  }

  // =====  =====

  setActive(active: boolean): void {
    if (this._active === active) return;

    this._active = active;

    if (active) {
      this.onActivate();
    } else {
      this.onDeactivate();
    }
  }

  isActive(): boolean {
    return this._active;
  }

  // =====  =====

  
  protected onActivate(): void {
    // 默认空实现，子类可重写
  }

  /**
   *
   *
   *  subscribeEvent
   */
  protected onDeactivate(): void {
    
    for (const subscription of this._eventSubscriptions) {
      this._eventBus.unsubscribe(
        subscription.eventType,
        subscription.handler,
      );
    }
    this._eventSubscriptions = [];
  }

  // =====  =====

  
  protected subscribeEvent(
    eventType: string,
    handler: EventHandler,
    priority?: number,
  ): void {
    this._eventBus.subscribe(eventType, handler, priority);
    this._eventSubscriptions.push({ eventType, handler });
  }

  protected get _eventBus() {
    const runtime = this._owner?.runtime ?? this._runtime;
    if (!runtime) {
      throw new Error(`Ability ${this.id} must have an owner`);
    }
    return runtime.events;
  }

  // =====  =====

  /**
   *
   * @param context  caster  target
   * @returns
   */
  canTrigger(context: AbilityContext): boolean {
    void context;
    return this._owner !== null;
  }

  /**
   *
   * @param context  caster  target
   */
  execute(_context: AbilityContext): void {
    void _context;
    // 基类空实现，子类重写
  }

  // =====  =====

  get priority(): number {
    return this._priority;
  }

  setPriority(value: number): void {
    this._priority = value;
  }

  // =====  =====

  /**
   *
   *  owner  active
   */
  clone(): Ability {
    const cloned = new Ability(this.id, this.name, this.type, this.description);
    cloned._priority = this._priority;
    cloned.tags.addTags(this.tags.getTags());
    return cloned;
  }

  // =====  =====

  
  destroy(): void {
    this.setActive(false);
    this._owner = null;
  }
}
