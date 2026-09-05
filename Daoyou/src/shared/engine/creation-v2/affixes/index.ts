/*
 * affixes/index.ts:
 *  composer
 */
export type {
  AffixDefinition,
  AffixEffectTemplate,
  AffixListenerSpec,
  AffixScalableValue,
  AffixTagMatchGroup,
  AffixTagMatcher,
  ScalableParam,
  ScalableValueV2,
} from './types';
export {
  collectAffixMatcherReferencedTags,
  flattenAffixMatcherTags,
  matchAll,
  matchAny,
  matchNone,
} from './types';
export { AffixEffectTranslator } from './AffixEffectTranslator';
export {
  buildNeutralCreationTagSignals,
  evaluateAffixMatcher,
} from './AffixMatcher';
export { AffixRegistry } from './AffixRegistry';
export { AffixPoolBuilder } from './AffixPoolBuilder';
export { AffixSelector } from './AffixSelector';
export type { AffixSelectionResult } from './AffixSelector';
export { AffixPicker } from './AffixPicker';

import { AffixRegistry } from './AffixRegistry';
import { SKILL_AFFIXES } from './definitions/skillAffixes';
import { ARTIFACT_AFFIXES } from './definitions/artifactAffixes';
import { GONGFA_AFFIXES } from './definitions/gongfaAffixes';


export const DEFAULT_AFFIX_REGISTRY: AffixRegistry = (() => {
  const registry = new AffixRegistry();
  registry.register(SKILL_AFFIXES);
  registry.register(ARTIFACT_AFFIXES);
  registry.register(GONGFA_AFFIXES);
  return registry;
})();
