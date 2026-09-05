/**
 * AffixListenerSpec →
 *
 *  listenerSpeceventType + scope "" / ""
 *  renderAffixLine
 */
import type { AffixListenerSpec } from '@shared/engine/creation-v2/affixes/types';
import type { ListenerScope } from '../../core/configs';
import type { AffixTextRenderContext } from './context';

const EVENT_LABEL: Record<string, string> = {
  DamageSegmentAppliedEvent: '受击后',
  DamageSegmentRequestedEvent: '造成伤害时',
  RoundPreEvent: '每回合',
  ActionPreEvent: '行动前',
  SkillCastEvent: '施法时',
  BuffAddEvent: '获得状态时',
  BuffAppliedEvent: '状态生效时',
  DodgeEvent: '闪避时',
  ControlResistEvent: '抵抗控制时',
  ShieldBreakEvent: '护盾破裂时',
  HealEvent: '治疗时',
  DeathPreventEvent: '免死触发时',
};

function describeDamageTakenListener(scope?: ListenerScope): string {
  switch (scope) {
    case 'owner_as_caster':
      return '造成伤害后';
    case 'owner_as_actor':
    case 'global':
      return '伤害结算后';
    case 'owner_as_target':
    default:
      return '受击后';
  }
}

function describeDamageRequestListener(scope?: ListenerScope): string {
  switch (scope) {
    case 'owner_as_target':
      return '将受伤害时';
    case 'owner_as_actor':
    case 'global':
      return '伤害计算时';
    case 'owner_as_caster':
    default:
      return '造成伤害时';
  }
}

/**
 *  listenerSpec  listener
 */
export function describeListener(
  spec?: AffixListenerSpec,
  context?: AffixTextRenderContext,
): string {
  if (!spec) return '';
  const eventType = context?.eventType ?? spec.eventType;
  const scope = context?.listenerScope ?? spec.scope;

  switch (eventType) {
    case 'DamageSegmentAppliedEvent':
      return describeDamageTakenListener(scope);
    case 'DamageSegmentRequestedEvent':
      return describeDamageRequestListener(scope);
    default:
      return EVENT_LABEL[eventType] ?? '';
  }
}
