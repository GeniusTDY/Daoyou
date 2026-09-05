import { ScalableParam } from "../types";

const QUALITY_COEFFICIENT_STEP = 0.125;
const DAMAGE_COEFFICIENT_BASE_FACTOR = 1.12;
const DAMAGE_QUALITY_COEFFICIENT_STEP = 0.055;

export function qualityScaledCoefficient(base: number): ScalableParam {
  return {
    base,
    scale: 'quality',
    coefficient: base * QUALITY_COEFFICIENT_STEP,
  };
}

/**
 *
 *  12.5%/
 *
 */
export function qualityScaledDamageCoefficient(base: number): ScalableParam {
  return {
    base: base * DAMAGE_COEFFICIENT_BASE_FACTOR,
    scale: 'quality',
    coefficient: base * DAMAGE_QUALITY_COEFFICIENT_STEP,
  };
}
