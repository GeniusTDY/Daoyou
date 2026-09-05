import { AttributeType } from './types';

/**
 *
 * - FIXED  0.12 / 0.25
 * - ADD
 */
export const PERCENTAGE_ATTRIBUTE_TYPES = new Set<AttributeType>([
  AttributeType.CRIT_RATE,
  AttributeType.CRIT_DAMAGE_MULT,
  AttributeType.EVASION_RATE,
  AttributeType.CONTROL_HIT,
  AttributeType.CONTROL_RESISTANCE,
  AttributeType.ARMOR_PENETRATION,
  AttributeType.MAGIC_PENETRATION,
  AttributeType.CRIT_RESIST,
  AttributeType.CRIT_DAMAGE_REDUCTION,
  AttributeType.ACCURACY,
  AttributeType.HEAL_AMPLIFY,
  AttributeType.HEAL_RECEIVED_REDUCTION,
]);

export function isPercentageAttributeType(attrType: AttributeType): boolean {
  return PERCENTAGE_ATTRIBUTE_TYPES.has(attrType);
}
