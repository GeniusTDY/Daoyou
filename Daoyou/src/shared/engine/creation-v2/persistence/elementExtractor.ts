import type { ElementType } from '@shared/types/constants';
import { ELEMENT_TO_RUNTIME_ABILITY_TAG } from '@shared/engine/shared/tag-domain';

/**
 *  abilityTags
 * abilityTags  'Ability.Element.Fire'  ElementType''
 */
const RUNTIME_TAG_TO_ELEMENT: Record<string, ElementType> = Object.fromEntries(
  Object.entries(ELEMENT_TO_RUNTIME_ABILITY_TAG).map(([el, tag]) => [tag, el as ElementType]),
);

export function extractElement(abilityTags: string[]): ElementType | undefined {
  for (const tag of abilityTags) {
    const el = RUNTIME_TAG_TO_ELEMENT[tag];
    if (el) return el;
  }
  return undefined;
}
