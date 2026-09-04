/*
 * SlugService:  buff slug/id
 *  buff  productType  sessionId
 */
import { CreationProductType } from '../types';
import { CREATION_SLUG_CONFIG } from '../config/CreationSlugConfig';

export function buildAbilitySlug(
  slugSeed: string,
  productType?: CreationProductType,
): string {
  return productType
    ? `${CREATION_SLUG_CONFIG.abilityPrefix}-${productType}-${slugSeed}`
    : `${CREATION_SLUG_CONFIG.abilityPrefix}-${slugSeed}`;
}

export function buildStatBuffId(
  attrType: string,
  modType: string,
): string {
  return `${CREATION_SLUG_CONFIG.statBuffPrefix}-${attrType}-${modType}`;
}
