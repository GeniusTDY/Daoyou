export const RECYCLE_PRICE_PROFILE = 'conservative' as const;

// MaterialGenerator base * typeMultiplier * [0.8, 1.2]
export const PRODUCE_PRICE_FACTOR_MIN = 0.8;
export const PRODUCE_PRICE_FACTOR_MAX = 1.2;
//  0.95  0.65
export const RECYCLE_PRICE_FACTOR_CAP = 0.6;
//  anchorPrice
export const LOW_TIER_ANCHOR_FACTOR: Record<'凡品' | '灵品' | '玄品', number> =
  {
    凡品: 0.26,
    灵品: 0.33,
    玄品: 0.42,
  };


export const HIGH_TIER_BASE_FACTOR: Record<
  '真品' | '地品' | '天品' | '仙品' | '神品',
  number
> = {
  真品: 0.38,
  地品: 0.44,
  天品: 0.5,
  仙品: 0.58,
  神品: 0.64,
};


export const APPRAISAL_RATING_MULTIPLIER: Record<
  'S' | 'A' | 'B' | 'C',
  number
> = {
  S: 1.25,
  A: 1.15,
  B: 1.08,
  C: 1.0,
};

export const APPRAISAL_KEYWORD_WEIGHTS: Record<string, number> = {
  上古: 0.04,
  本源: 0.06,
  法则: 0.05,
  稀缺: 0.03,
  罕见: 0.02,
  完整: 0.02,
  残缺: -0.04,
  驳杂: -0.03,
  杂质: -0.03,
};

export const APPRAISAL_KEYWORD_BONUS_MIN = -0.08;
export const APPRAISAL_KEYWORD_BONUS_MAX = 0.12;
