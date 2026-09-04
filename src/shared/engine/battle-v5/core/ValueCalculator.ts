import { Unit } from '../units/Unit';
import { AttributeType, type DamageComponent } from './types';

/**
 *
 *  +  *  +
 */
export interface ScalableValue {
  base?: number;
  attribute?: AttributeType;
  coefficient?: number;
  /**  0.08  8%  */
  targetMaxHpRatio?: number;
  /**  0.08  8%  */
  targetMaxMpRatio?: number;
}

export interface ScalableValueResult {
  total: number;
  components: DamageComponent[];
}


export class ValueCalculator {
  
  static calculate(value: ScalableValue | number, caster: Unit, target?: Unit): number {
    return this.calculateDetailed(value, caster, target).total;
  }

  static calculateDetailed(
    value: ScalableValue | number,
    caster: Unit,
    target?: Unit,
  ): ScalableValueResult {
    if (typeof value === 'number') {
      return {
        total: value,
        components: [{
          kind: 'base',
          amount: value,
          mitigation: 'normal',
          attackBase: value,
          segmentMultiplier: 1,
        }],
      };
    }

    const components: DamageComponent[] = [];
    let total = 0;
    const base = value.base ?? 0;
    const coefficient = value.coefficient ?? 1.0;
    if (value.attribute) {
      const attrValue = caster.attributes.getValue(value.attribute);
      const amount = base + attrValue * coefficient;
      total += amount;
      if (coefficient > 0) {
        components.push({
          kind: `attribute:${value.attribute}`,
          amount,
          mitigation: 'normal',
          attackBase: attrValue + base / coefficient,
          segmentMultiplier: coefficient,
        });
      } else if (base > 0) {
        components.push({
          kind: 'base',
          amount: base,
          mitigation: 'normal',
          attackBase: base,
          segmentMultiplier: 1,
        });
      }
    } else if (base) {
      total += base;
      components.push({
        kind: 'base',
        amount: base,
        mitigation: 'normal',
        attackBase: base,
        segmentMultiplier: 1,
      });
    }
    if (value.targetMaxHpRatio && target) {
      const amount = target.getMaxHp() * value.targetMaxHpRatio;
      total += amount;
      components.push({
        kind: 'targetMaxHpRatio',
        amount,
        mitigation: 'bypass_defense',
      });
    }
    if (value.targetMaxMpRatio && target) {
      const amount = target.getMaxMp() * value.targetMaxMpRatio;
      total += amount;
      components.push({
        kind: 'targetMaxMpRatio',
        amount,
        mitigation: 'bypass_defense',
      });
    }
    return { total: Math.round(total), components };
  }
}
