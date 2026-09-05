import { Ability, AbilityConfig, AbilityFactory } from '../contracts/battle';
import { CreationAbilityBuilder } from './types';

/*
 * BattleAbilityBuilder: CreationAbilityBuilder  AbilityFactory
 *  AbilityConfig  Ability
 */
export class BattleAbilityBuilder implements CreationAbilityBuilder {
  build(config: AbilityConfig): Ability {
    return AbilityFactory.create(config);
  }
}