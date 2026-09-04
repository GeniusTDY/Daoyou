/*
 * composers/types.ts: Composer
 * ProductBlueprintComposer  Composer  ProductComposerRegistry
 */
import { CreationSession } from '../CreationSession';
import { CreationBlueprint } from '../types';
export { buildAbilitySlug } from '../services/SlugService';

/**
 *  Composer
 * SkillBlueprintComposer / ArtifactBlueprintComposer / GongFaBlueprintComposer
 */
export interface ProductBlueprintComposer {
  compose(session: CreationSession): CreationBlueprint;
}

