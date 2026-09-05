import { BuffId, BuffType } from '../core/types';
import { Unit } from '../units/Unit';
import { GameplayTagContainer } from '@shared/engine/shared/tag-domain';
import type { CombatAttributionV3 } from '../v3/origin';

export type BuffDeactivateReason =
  | 'manual'
  | 'expired'
  | 'dispel'
  | 'replace'
  | 'death';


export const StackRule = {
  STACK_LAYER: 'stack_layer',
  REFRESH_DURATION: 'refresh_duration',
  OVERRIDE: 'override',
  IGNORE: 'ignore',
} as const;


export type StackRule = typeof StackRule[keyof typeof StackRule];

/**
 * BUFF
 *
 * GAS+EDA
 * - Buff  owner
 * -  Buff
 * - setOwner() → onActivate() → [] → onDeactivate()
 *
 *
 * -  onActivate()
 * -  onDeactivate()
 * -  _subscribeEvent()
 */
export class Buff {
  readonly id: BuffId;
  readonly name: string;
  readonly description?: string;
  readonly type: BuffType;
  readonly logVisibility: 'player' | 'debug';
  readonly statusVisibility: 'player' | 'hidden';
  readonly dispelPolicy: 'normal' | 'protected';
  readonly dispelMode: 'whole' | 'one_layer';
  readonly countsAsStatus: boolean;
  readonly removeOnDeath: boolean;
  readonly durationUnit: 'owner_action' | 'round';
  private _duration: number;
  private _maxDuration: number;

  // GAS
  tags: GameplayTagContainer;
  readonly stackRule: StackRule;
  readonly stackPriority: number;
  readonly maxLayers?: number;

  // GAS owner
  protected _owner: Unit | null = null;

  // GAS source  Buff /
  protected _source: Unit | null = null;
  private _combatAttribution?: CombatAttributionV3;

  //  Buff
  protected _layer: number = 1;

  
  protected _subscribedHandlers: Array<{
    eventType: string;
    handler: (event: unknown) => void;
  }> = [];

  constructor(
    id: BuffId,
    name: string,
    type: BuffType,
    duration: number,
    stackRule: StackRule = StackRule.REFRESH_DURATION,
    description?: string,
    maxLayers?: number,
    logVisibility: 'player' | 'debug' = 'player',
    dispelPolicy: 'normal' | 'protected' = 'normal',
    countsAsStatus: boolean = true,
    statusVisibility?: 'player' | 'hidden',
    stackPriority: number = 0,
    dispelMode: 'whole' | 'one_layer' = 'whole',
    removeOnDeath: boolean = false,
    durationUnit: 'owner_action' | 'round' = 'owner_action',
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.logVisibility = logVisibility;
    this.statusVisibility = statusVisibility ?? (
      logVisibility === 'debug' ? 'hidden' : 'player'
    );
    this.dispelPolicy = dispelPolicy;
    this.dispelMode = dispelMode;
    this.countsAsStatus = countsAsStatus;
    this.removeOnDeath = removeOnDeath;
    this.durationUnit = durationUnit;
    this.type = type;
    this._maxDuration = duration;
    this._duration = duration;
    this.stackRule = stackRule;
    this.stackPriority = stackPriority;
    this.maxLayers = maxLayers;

    
    this.tags = new GameplayTagContainer();
  }

  /**
   *  owner  BuffContainer
   *  GAS Buff
   */
  setOwner(owner: Unit): void {
    this._owner = owner;
  }

  /**
   *  owner
   */
  getOwner(): Unit | null {
    return this._owner;
  }

  /**
   *  source Buff
   *  DOT
   */
  setSource(source: Unit | null): void {
    this._source = source;
  }

  /**
   *  sourceBuff
   */
  getSource(): Unit | null {
    return this._source;
  }

  setCombatAttributionV3(attribution: CombatAttributionV3): void {
    this._combatAttribution = attribution;
  }

  getCombatAttributionV3(): CombatAttributionV3 | undefined {
    return this._combatAttribution;
  }

  
  getLayer(): number {
    return this._layer;
  }

  /**
   *
   * @param layers  1
   */
  addLayer(layers: number = 1): void {
    const previous = this._layer;
    this._layer = Math.min(
      this.maxLayers ?? Number.POSITIVE_INFINITY,
      this._layer + layers,
    );
    if (this._layer !== previous) this.onLayerChanged();
  }

  
  setLayer(layer: number): void {
    const previous = this._layer;
    this._layer = Math.max(
      1,
      Math.min(this.maxLayers ?? Number.POSITIVE_INFINITY, layer),
    );
    if (this._layer !== previous) this.onLayerChanged();
  }

  /** Buff  */
  onLayerChanged(): void {}

  /**
   * Buff GAS
   *
   *
   *  setOwner()  this._owner
   */
  onActivate(): void {
    // 基类默认行为：无操作
    // 子类应重写此方法实现具体逻辑
  }

  /**
   * Buff GAS
   *
   */
  onDeactivate(reason?: BuffDeactivateReason): void {
    void reason;
    
    this._unsubscribeAll();
    // 子类应重写此方法实现具体清理逻辑
  }

  /**
   *  handler
   */
  protected _subscribeEvent<T extends { type: string }>(
    eventType: string,
    handler: (event: T) => void,
    priority: number = 0
  ): void {
    //  handler
    const wrappedHandler = handler as (event: unknown) => void;
    this._subscribedHandlers.push({
      eventType,
      handler: wrappedHandler,
    });
    this._eventBus.subscribe(eventType, wrappedHandler, priority);
  }

  
  protected _unsubscribeEvent(eventType: string): void {
    const remaining: Array<{
      eventType: string;
      handler: (event: unknown) => void;
    }> = [];

    for (const subscription of this._subscribedHandlers) {
      if (subscription.eventType === eventType) {
        this._eventBus.unsubscribe(subscription.eventType, subscription.handler);
      } else {
        remaining.push(subscription);
      }
    }

    this._subscribedHandlers = remaining;
  }

  
  protected _unsubscribeAll(): void {
    for (const subscription of this._subscribedHandlers) {
      this._eventBus.unsubscribe(subscription.eventType, subscription.handler);
    }
    this._subscribedHandlers = [];
  }

  protected get _eventBus() {
    if (!this._owner) throw new Error(`Buff ${this.id} must have an owner`);
    return this._owner.runtime.events;
  }

  
  getDuration(): number {
    return this._duration;
  }

  getMaxDuration(): number {
    return this._maxDuration;
  }

  tickDuration(): void {
    if (!this.isPermanent()) {
      this._duration = Math.max(0, this._duration - 1);
    }
  }

  refreshDuration(): void {
    this._duration = this._maxDuration;
  }

  /**
   *  REFRESH_DURATION
   * @param duration
   */
  refreshToDuration(duration: number): void {
    this._duration = duration;
    this._maxDuration = duration;
  }

  restoreDuration(current: number, maximum: number): void {
    this._maxDuration = Math.trunc(maximum);
    this._duration = this._maxDuration === -1
      ? -1
      : Math.max(0, Math.min(this._maxDuration, Math.trunc(current)));
  }

  /**
   *  clone
   */
  protected setDuration(duration: number): void {
    this._duration = duration;
  }

  isPermanent(): boolean {
    return this._maxDuration === -1;
  }

  isExpired(): boolean {
    return !this.isPermanent() && this._duration <= 0;
  }

  
  getAttributeModifiers(): [] {
    return [];
  }

  /**
   *  Buff
   *
   *
   * - owner  source  setOwner/setSource
   * -
   */
  clone(): Buff {
    const cloned = new Buff(
      this.id,
      this.name,
      this.type,
      this._maxDuration,
      this.stackRule,
      this.description,
      this.maxLayers,
      this.logVisibility,
      this.dispelPolicy,
      this.countsAsStatus,
      this.statusVisibility,
      this.stackPriority,
      this.dispelMode,
      this.removeOnDeath,
      this.durationUnit,
    );
    cloned.setDuration(this._duration);
    cloned.tags = this.tags.clone();
    cloned._layer = this._layer;
    //  ownersourceattribution
    return cloned;
  }
}
