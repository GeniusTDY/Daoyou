/**
 *
 * enemy:
 * ally:
 * any:
 * self:
 */
export type TargetTeam = 'enemy' | 'ally' | 'any' | 'self';

/**
 *
 * single:
 * aoe:
 * random:
 */
export type TargetScope = 'single' | 'aoe' | 'random';


export type TargetFilter =
  | 'lowest_hp' 
  | 'highest_hp' 
  | 'lowest_mp' 
  | 'fastest' 
  | 'slowest' 
  | 'nearest' 
  | 'furthest'; 


export interface TargetPolicyConfig {
  team: TargetTeam;
  scope: TargetScope;
  filters?: TargetFilter[];
  maxTargets?: number; // AOE
}


export class TargetPolicy {
  readonly team: TargetTeam;
  readonly scope: TargetScope;
  readonly filters: TargetFilter[];
  readonly maxTargets: number;

  constructor(config: TargetPolicyConfig) {
    this.team = config.team;
    this.scope = config.scope;
    this.filters = config.filters ?? [];
    this.maxTargets = config.maxTargets ?? 1;
  }

  
  static default(): TargetPolicy {
    return new TargetPolicy({
      team: 'enemy',
      scope: 'single',
    });
  }

  
  static self(): TargetPolicy {
    return new TargetPolicy({
      team: 'self',
      scope: 'single',
    });
  }

  /**
   * AOE
   */
  static aoeEnemy(maxTargets: number = 5): TargetPolicy {
    return new TargetPolicy({
      team: 'enemy',
      scope: 'aoe',
      maxTargets,
    });
  }
}
