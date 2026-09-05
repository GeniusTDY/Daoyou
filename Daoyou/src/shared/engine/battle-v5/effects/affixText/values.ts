/**
 * ScalableValue →
 *
 *  /  /  `ScalableValue`
 *   { base?, attribute?, coefficient?, targetMaxHpRatio? }
 *
 *
 */
import type { ScalableValue } from '../../core/ValueCalculator';
import { attrLabel } from './attributes';
import { formatAffixNumber, formatAffixPercent } from './format';

/**
 *  ScalableValue
 *   { base: 38 }                                  → "38"
 *   { base: 38, attribute: 'willpower', coefficient: 0.29 } → "38 + ×29%"
 *   { attribute: 'spirit', coefficient: 0.5 }     → "×50%"
 *   { targetMaxHpRatio: 0.08 }                    → "8%"
 *   { targetMaxMpRatio: 0.08 }                    → "8%"
 */
export function formatScalableValue(value: ScalableValue): string {
  const parts: string[] = [];

  const hasBase = value.base !== undefined && value.base !== 0;
  if (hasBase) {
    parts.push(formatAffixNumber(value.base ?? 0));
  }

  if (value.attribute && value.coefficient) {
    parts.push(
      `${attrLabel(value.attribute)}×${formatAffixPercent(value.coefficient)}`,
    );
  }

  if (value.targetMaxHpRatio && value.targetMaxHpRatio > 0) {
    parts.push(`目标气血${formatAffixPercent(value.targetMaxHpRatio)}`);
  }

  if (value.targetMaxMpRatio && value.targetMaxMpRatio > 0) {
    parts.push(`目标法力${formatAffixPercent(value.targetMaxMpRatio)}`);
  }

  if (parts.length === 0) {
    // base  0  0
    return formatAffixNumber(value.base ?? 0);
  }

  return parts.join(' + ');
}
