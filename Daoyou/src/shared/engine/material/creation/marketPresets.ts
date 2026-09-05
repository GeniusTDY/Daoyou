import type { ElementType, MaterialType, Quality } from '@shared/types/constants';
import marketData from './data/marketPresets.json';

export interface MarketMaterialPreset {
  name: string;
  description: string;
  element: ElementType;
}

type QualityPresets = Record<Quality, MarketMaterialPreset[]>;

/**
 *
 *
 * commontreasure
 * heavenblack
 *
 *  ~
 *  12  7  × 5  × 12  = 420
 *
 *  data/marketPresets.json
 */
export const MARKET_PRESET_POOL = marketData as Record<MaterialType, QualityPresets>;
