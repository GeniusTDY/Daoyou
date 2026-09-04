import { CREATION_ROLL_POLICY } from '../config/CreationBalance';
import { AffixCandidate, RolledAffix, EnergyBudget } from '../types';

/**
 *
 * CREATION_ROLL_POLICY
 * rollEfficiencyfinalMultiplier
 */
export class AffixRollEngine {
  constructor(private readonly rng: () => number = Math.random) {}

  /**
   * “” Perfect
   * @param candidate
   * @param budget  (Bias)
   * @param rollScore
   */
  roll(
    candidate: AffixCandidate,
    budget: EnergyBudget,
    rollScore: number,
  ): RolledAffix {
    const {
      globalVarianceRange,
      perfectThreshold,
      energyBiasFactor,
      distribution,
    } = CREATION_ROLL_POLICY;

    // 1.  (Energy Bias)
    
    const bias = Math.min(0.12, budget.effectiveTotal * energyBiasFactor);

    // 2.  (0.0 - 1.0)
    //  0.5 + bias 0.16
    const efficiency =
      distribution === 'normal'
        ? this.nextNormal(0.5 + bias, 0.16)
        : this.rng() + bias;

    // 3.  0 - 1
    const rollEfficiency = Math.max(0, Math.min(1, efficiency));

    // 4.
    const [min, max] = globalVarianceRange;
    const finalMultiplier = min + (max - min) * rollEfficiency;

    // 5.  Perfect
    const isPerfect = rollEfficiency >= perfectThreshold;

    return {
      ...candidate,
      rollScore,
      rollEfficiency,
      finalMultiplier,
      isPerfect,
    };
  }

  /**
   * Box-Muller
   */
  private nextNormal(mean: number, stdDev: number): number {
    const u = 1 - this.rng();
    const v = 1 - this.rng();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdDev + mean;
  }
}
