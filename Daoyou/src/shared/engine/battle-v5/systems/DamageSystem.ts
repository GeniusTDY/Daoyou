import { getRealmDamagePressureMultiplier } from '@shared/config/realmProgression';
import { GameplayTags } from '@shared/engine/shared/tag-domain';
import { battleRandom, type BattleRandomSource } from '../core/BattleRandom';
import { EventBus } from '../core/EventBus';
import { BattleResolutionError } from '../core/BattleResolutionError';
import {
  DamageSegmentAppliedEvent,
  DamageSegmentRequestedEvent,
  DodgeEvent,
  EventPriorityLevel,
  HitCheckEvent,
  ShieldBreakEvent,
  SkillCastEvent,
  HitResolvedEvent,
} from '../core/events';
import {
  hasCommittedDeath,
  isDeathProtectedHit,
  markDamageDealt,
  markDeathCommitted,
} from '../core/runtimeState';
import {
  AttributeType,
  type DamageComponent,
  DamageSource,
  DamageType,
} from '../core/types';
import { CombatResultEmitterV3 } from '../v3/CombatResultEmitterV3';
import { CombatAttributionV3 } from '../v3/origin';
import { calculateSpiritualRootDamageMultiplier } from './spiritualRootResonance';
import { requireResolution } from '../core/resolution';

/**
 * DamageSystem -
 *
 * EDA
 * -  SkillCastEvent DamageSegmentRequestedEvent
 * -  DamageSegmentRequestedEvent
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  : SkillCastEvent → HitCheckEvent → DamageSegmentRequestedEvent     │
 * │  DOT:  ActionPreEvent ─────────────────→ DamageSegmentRequestedEvent     │
 * │  :    ──────────────────────→ DamageSegmentRequestedEvent     │
 * └─────────────────────────────────────────────────────────────────────┘
 *                              ↓
 *         DamageSegmentRequestedEvent → [] → [/] →  → DamageSegmentAppliedEvent
 */
export class DamageSystem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _handlers: Map<string, (event: any) => void> = new Map();

  constructor(
    private readonly eventBus: EventBus = EventBus.instance,
    private readonly random: BattleRandomSource = { next: battleRandom },
  ) {
    this._subscribeToEvents();
  }

  private _subscribeToEvents(): void {
    // 1.
    const skillCastHandler = (event: SkillCastEvent) =>
      this._onSkillCast(event);
    this.eventBus.subscribe<SkillCastEvent>(
      'SkillCastEvent',
      skillCastHandler,
      EventPriorityLevel.HIT_CHECK,
    );
    this._handlers.set('SkillCastEvent', skillCastHandler);

    // 2.
    const damageRequestHandler = (event: DamageSegmentRequestedEvent) =>
      this._onDamageRequestCalculate(event);
    this.eventBus.subscribe<DamageSegmentRequestedEvent>(
      'DamageSegmentRequestedEvent',
      damageRequestHandler,
      EventPriorityLevel.DAMAGE_REQUEST,
    );
    this._handlers.set('DamageSegmentRequestedEvent', damageRequestHandler);

    // 3.  DAMAGE_APPLY
    //     RequestedEvent Prepared
    const damageApplyHandler = (event: DamageSegmentRequestedEvent) =>
      this._onDamageApply(event);
    this.eventBus.subscribe<DamageSegmentRequestedEvent>(
      'DamageSegmentRequestedEvent',
      damageApplyHandler,
      EventPriorityLevel.DAMAGE_APPLY - 1,
    );
    this._handlers.set('DamageSegmentRequestedEvent:apply', damageApplyHandler);
  }

  // ====================  ====================

  /**
   *
   * SkillCastEvent → HitCheckEvent → DamageSegmentRequestedEvent
   */
  private _onSkillCast(event: SkillCastEvent): void {
    const { caster, target, ability } = event;
    const resolution = requireResolution(event);

    const hitCheckEvent: HitCheckEvent = {
      type: 'HitCheckEvent',
      timestamp: caster.runtime.clock.now(),
      caster,
      target,
      ability,
      resolution,
      isHit: true,
      isDodged: false,
      isResisted: false,
      hitPolicy: event.hitPolicy,
    };

    // /
    if (caster === target || event.hitPolicy === 'guaranteed') {
      hitCheckEvent.isHit = true;
    } else {
      // ===== ①  =====
      //  EVASION_RATE  ACCURACY
      const evasionRate = target.attributes.getValue(
        AttributeType.EVASION_RATE,
      );
      const accuracy = caster.attributes.getValue(AttributeType.ACCURACY);
      const dodgeChance = Math.max(
        3,
        Math.min(45, (evasionRate - accuracy) * 100),
      );
      if (this.random.next() * 100 < dodgeChance) {
        hitCheckEvent.isDodged = true;
        hitCheckEvent.isHit = false;
      }

      // 神识抵抗在 ApplyBuffEffect 内按控制效果逐个结算，不能阻断伤害链。
    }

    
    const publishedHitCheck = this.eventBus.publish(hitCheckEvent);

    this.eventBus.publish<HitResolvedEvent>({
      type: 'HitResolvedEvent',
      timestamp: caster.runtime.clock.now(),
      caster,
      target,
      ability,
      isHit: hitCheckEvent.isHit,
      isDodged: hitCheckEvent.isDodged,
      isResisted: hitCheckEvent.isResisted,
      resolution,
    });

    if (hitCheckEvent.isDodged) {
      const attribution = CombatAttributionV3.owned(target, {
        kind: 'mechanic',
        id: 'evasion',
        name: '闪避',
      });
      if (!publishedHitCheck.trace)
        throw new Error('Dodge result has no trace');
      new CombatResultEmitterV3().commit(
        target,
        { type: 'defense', defense: 'dodge' },
        { origin: attribution.origin, parentTrace: publishedHitCheck.trace },
      );
      this.eventBus.publish<DodgeEvent>({
        type: 'DodgeEvent',
        timestamp: caster.runtime.clock.now(),
        caster,
        target,
        ability,
        resolution,
      });
    }

    //  SkillCastEvent
    //  ActionExecutionSystem
    event.isHit = hitCheckEvent.isHit;
    event.isDodged = hitCheckEvent.isDodged;
    event.isResisted = hitCheckEvent.isResisted;

    // 命中判定逻辑结束。不再此处自动发布 DamageSegmentRequestedEvent。
    // 具体的伤害效果由 Ability 的效果链 (GameplayEffect) 主动发布。
  }

  // ====================  ====================

  /**
   *
   * DOT
   *
   *
   * ① DEF/DEF/
   * ②  A²/(A+D)
   * ③ /
   * ④ /
   * ⑤
   * ⑥  (0.9~1.1)
   * ⑦  +
   */
  private _onDamageRequestCalculate(event: DamageSegmentRequestedEvent): void {
    if (!event.target.isAlive()) {
      return;
    }

    const { target } = event;

    const damageType = this._resolveDamageType(event);

    if (event.calculationMode === 'resolved_final') {
      event.finalDamage = Math.max(1, Math.round(event.finalDamage));
      return;
    }

    // ===== ①  =====
    let effectiveDef = 0;
    if (
      event.damageSource === DamageSource.DIRECT ||
      event.damageSource === DamageSource.COUNTER ||
      event.damageSource === DamageSource.FOLLOW_UP
    ) {
      if (damageType === DamageType.PHYSICAL) {
        const baseDef = target.attributes.getValue(AttributeType.DEF);
        const armorPen = Math.max(
          0,
          Math.min(
            0.5,
            event.caster?.attributes.getValue(
              AttributeType.ARMOR_PENETRATION,
            ) ?? 0,
          ),
        );
        effectiveDef = baseDef * (1 - armorPen);
      } else if (damageType === DamageType.MAGICAL) {
        const baseDef = target.attributes.getValue(AttributeType.MAGIC_DEF);
        const magicPen = Math.max(
          0,
          Math.min(
            0.5,
            event.caster?.attributes.getValue(
              AttributeType.MAGIC_PENETRATION,
            ) ?? 0,
          ),
        );
        effectiveDef = baseDef * (1 - magicPen);
      }
    }

    // ===== ②  A²/(A+D) =====
    const preMitigationDamage = event.finalDamage;
    event.finalDamage = this._applyDefense(
      event,
      preMitigationDamage,
      effectiveDef,
    );

    // ===== ③ /=====
    // NOTE:
    const increasePct = Math.max(0, event.damageIncreasePctBucket ?? 0);
    const reductionPct = Math.min(
      0.7,
      Math.max(0, event.damageReductionPctBucket ?? 0),
    );
    const damageMultiplier = Math.max(0, 1 + increasePct - reductionPct);
    event.finalDamage *= damageMultiplier;

    // ===== ④  =====
    event.finalDamage *= this._getRealmDamageMultiplier(event);

    // ===== ⑤ / =====
    event.finalDamage *= calculateSpiritualRootDamageMultiplier(event);

    // ===== ⑥  =====
    // /
    if (
      event.caster &&
      event.canCrit !== false &&
      event.damageSource !== DamageSource.REFLECT
    ) {
      const rawCritRate = event.caster.attributes.getValue(
        AttributeType.CRIT_RATE,
      );
      const critResist = target.attributes.getValue(AttributeType.CRIT_RESIST);
      const effectiveCritRate = Math.max(
        0,
        Math.min(0.95, rawCritRate - critResist),
      );
      if (
        event.forceCritical ||
        event.isCritical ||
        this.random.next() < effectiveCritRate
      ) {
        event.isCritical = true;
        const baseCritMult = event.caster.attributes.getValue(
          AttributeType.CRIT_DAMAGE_MULT,
        );
        const critDmgReduction = target.attributes.getValue(
          AttributeType.CRIT_DAMAGE_REDUCTION,
        );
        event.critMultiplier = Math.max(1.0, baseCritMult - critDmgReduction);
        event.finalDamage *= event.critMultiplier;
      }
    }

    // ===== ⑦  (0.9 ~ 1.1) =====
    const randomFactor = 0.9 + this.random.next() * 0.2;
    event.finalDamage = event.finalDamage * randomFactor;

    // ===== ⑧ 0 =====
    event.finalDamage = Math.max(1, Math.round(event.finalDamage));

  }

  private _onDamageApply(event: DamageSegmentRequestedEvent): void {
    if (!event.target.isAlive() || event.finalDamage <= 0) return;
    if (this._isOwnedDamageSourceDead(event)) return;
    this._updateTargetHealth(event, this._resolveDamageType(event));
  }

  private _isOwnedDamageSourceDead(
    event: DamageSegmentRequestedEvent,
  ): boolean {
    if (event.origin?.kind !== 'owned') return false;
    const ownerId = event.origin.owner.id;

    const source = [
      event.ability?.getOwner(),
      event.buff?.getCombatAttributionV3()?.owner,
      event.caster,
    ].find((unit) => unit?.id === ownerId);

    return source ? !source.isAlive() : false;
  }

  private _resolveDamageType(event: DamageSegmentRequestedEvent): DamageType {
    if (event.damageType) return event.damageType;

    const tags = event.ability?.tags || event.buff?.tags;
    if (tags?.hasTag(GameplayTags.ABILITY.CHANNEL.TRUE)) {
      return DamageType.TRUE;
    }
    if (tags?.hasTag(GameplayTags.ABILITY.CHANNEL.MAGIC)) {
      return DamageType.MAGICAL;
    }
    if (tags?.hasTag(GameplayTags.ABILITY.CHANNEL.PHYSICAL)) {
      return DamageType.PHYSICAL;
    }
    if (tags?.hasTag(GameplayTags.BUFF.DOT.ROOT)) {
      return DamageType.DOT;
    }

    return DamageType.PHYSICAL; 
  }

  private _applyDefense(
    event: DamageSegmentRequestedEvent,
    preMitigationDamage: number,
    effectiveDef: number,
  ): number {
    const components = event.damageComponents?.filter(
      (component): component is DamageComponent =>
        Number.isFinite(component.amount) && component.amount > 0,
    );
    if (!components?.length) {
      return this._applySmoothDefense(preMitigationDamage, effectiveDef);
    }

    const componentTotal = components.reduce(
      (sum, component) => sum + component.amount,
      0,
    );
    if (componentTotal <= 0) {
      return this._applySmoothDefense(preMitigationDamage, effectiveDef);
    }

    const scale = preMitigationDamage / componentTotal;
    return components.reduce((sum, component) => {
      if (component.mitigation === 'bypass_defense') {
        return sum + component.amount * scale;
      }

      if (
        component.attackBase !== undefined &&
        component.segmentMultiplier !== undefined
      ) {
        const attackBase = Math.max(0, component.attackBase);
        const multiplier = Math.max(0, component.segmentMultiplier) * scale;
        const afterDefense = this._applySmoothDefense(attackBase, effectiveDef);
        return sum + afterDefense * multiplier;
      }

      throw new BattleResolutionError(
        'BATTLE_DAMAGE_COMPONENT_INVALID',
        `Damage component ${component.kind} is missing attackBase/segmentMultiplier`,
      );
    }, 0);
  }

  private _applySmoothDefense(
    attackBase: number,
    effectiveDef: number,
  ): number {
    const attack = Math.max(0, attackBase);
    const defense = Math.max(0, effectiveDef);
    if (attack <= 0) return 0;
    return (attack * attack) / (attack + defense);
  }

  private _getRealmDamageMultiplier(event: DamageSegmentRequestedEvent): number {
    const attackerRank = event.caster?.getRealmMeta().realmRank;
    const defenderRank = event.target.getRealmMeta().realmRank;
    if (attackerRank === undefined || defenderRank === undefined) {
      return 1;
    }
    return getRealmDamagePressureMultiplier(attackerRank - defenderRank);
  }

  // ====================  ====================

  
  private _updateTargetHealth(
    damageEvent: DamageSegmentRequestedEvent,
    damageType: DamageType,
  ): void {
    const {
      target,
      finalDamage,
      caster,
      ability,
      buff,
      isCritical,
      critMultiplier,
      canLifesteal,
    } = damageEvent;

    if (finalDamage <= 0) {
      return;
    }

    const parentTrace = damageEvent.trace;
    const origin = damageEvent.origin;
    if (!parentTrace || !origin) {
      throw new Error(
        'Damage settlement requires explicit V3 trace and origin',
      );
    }
    const damageResultTrace = this.eventBus.reserveResolutionTrace(
      parentTrace.eventId,
    );
    const { resolutionId } = damageResultTrace;

    
    const beforeHp = target.getCurrentHp();
    const beforeShield = target.getCurrentShield();

    // 1.
    const remainingDamage = target.absorbDamage(finalDamage);
    const absorbedAmount = beforeShield - target.getCurrentShield();

    if (beforeShield > 0 && target.getCurrentShield() <= 0) {
      this.eventBus.publish<ShieldBreakEvent>({
        type: 'ShieldBreakEvent',
        timestamp: target.runtime.clock.now(),
        caster,
        target,
        ability,
        buff,
        brokenShieldAmount: beforeShield,
        overflowDamage: remainingDamage,
        damageSource: damageEvent.damageSource,
      });
    }

    // 2.
    const protectedHit = damageEvent.resolution?.hitId !== undefined &&
      isDeathProtectedHit(
        target,
        damageEvent.resolution.hitId,
        damageEvent.damageSource,
      );
    const hpDamage = protectedHit
      ? Math.min(remainingDamage, Math.max(0, beforeHp - 1))
      : remainingDamage;
    target.takeDamage(hpDamage);
    const actualHpDamage = Math.max(0, beforeHp - target.getCurrentHp());
    if (actualHpDamage + absorbedAmount <= 0) return;
    if (actualHpDamage + absorbedAmount > 0) {
      markDamageDealt(caster);
      if (damageEvent.damageSource === DamageSource.DIRECT) {
        caster?.combatResources.markDirectDamageDealt();
      }
    }

    // /
    
    const damageTakenTrace = this.eventBus.reserveTrace({
      resolutionId,
      parentEventId: parentTrace.eventId,
    });
    this.eventBus.runInCausalContext({ origin, trace: parentTrace }, () =>
      this.eventBus.publishImmutable<DamageSegmentAppliedEvent>({
        type: 'DamageSegmentAppliedEvent',
        timestamp: target.runtime.clock.now(),
        caster,
        target,
        ability,
        buff, // 传递 buff
        damageSource: damageEvent.damageSource,
        damageType,
        calculationMode: damageEvent.calculationMode,
        cause: damageEvent.cause,
        damageTags: damageEvent.damageTags,
        finalDamage: damageEvent.finalDamage,
        reflectSourceName:
          damageEvent.damageSource === DamageSource.REFLECT
            ? caster?.name
            : undefined,
        damageTaken: actualHpDamage,
        beforeHp,
        remainHp: target.getCurrentHp(), // 此时可能为 0
        shieldAbsorbed: absorbedAmount,
        remainShield: target.getCurrentShield(),
        hpReachedZeroBeforeReactions: target.getCurrentHp() <= 0,
        isCritical,
        critMultiplier,
        canLifesteal,
        trace: damageTakenTrace,
        origin,
        resolution: damageEvent.resolution,
      }),
    );

    const finalHp = target.getCurrentHp();
    const damageResult = new CombatResultEmitterV3().commit(
      target,
      {
        type: 'damage',
        amount: Math.round(actualHpDamage),
        beforeHp: Math.round(beforeHp),
        afterHp: Math.round(finalHp),
        damageType,
        damageSource: damageEvent.damageSource,
        critical: isCritical ?? false,
        shieldAbsorbed: Math.round(absorbedAmount),
      },
      { origin, parentTrace, reservedTrace: damageResultTrace },
    );

    if (beforeHp > 0 && finalHp <= 0 && !hasCommittedDeath(target)) {
      markDeathCommitted(target);
      target.buffs.removeBuffsOnDeath();
      new CombatResultEmitterV3().commit(
        target,
        {
          type: 'unit_died',
          killer: caster ? { id: caster.id, name: caster.name } : undefined,
        },
        { origin, parentTrace: damageResult.trace! },
      );
    }
  }

  
  destroy(): void {
    for (const [eventType, handler] of this._handlers) {
      this.eventBus.unsubscribe(eventType.split(':', 1)[0], handler);
    }
    this._handlers.clear();
  }
}
