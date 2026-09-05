import type { MarketLayer } from '@shared/types/market';


export function getSpiritFieldMarketSeedSlotCount(
  layer: MarketLayer,
  listingCount: number,
  ratios?: Partial<Record<MarketLayer, number>>,
): number {
  if (layer === 'black') return 0;
  const count = Math.max(0, Math.floor(listingCount));
  const ratio = Math.max(0, Math.min(1, ratios?.[layer] ?? 0));
  return Math.min(count, Math.round(count * ratio));
}
