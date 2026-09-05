import type { Ability, AbilityConfig } from '../contracts/battle';
import { CraftedOutcome, CreationBlueprint, CreationProductType } from '../types';

/*
 * Adapter CreationAbilityBuilder / CreationOutcomeMaterializer
 *  - CreationAbilityBuilder:  Creation  AbilityConfig  battle  Ability
 *  - CreationOutcomeMaterializer:  CreationBlueprint  CraftedOutcome blueprint  ability
 */
export interface CreationAbilityBuilder {
  build(config: AbilityConfig): Ability;
}

export interface CreationOutcomeMaterializer {
  materialize(
    productType: CreationProductType,
    blueprint: CreationBlueprint,
  ): CraftedOutcome;
}