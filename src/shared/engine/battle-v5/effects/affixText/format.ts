/**
 *
 *
 *  (`effectTextFormat`)
 *   - 34%33.75%
 *   -  1
 */

export function formatAffixNumber(value: number, maxDigits = 1): string {
  if (!Number.isFinite(value)) return '0';
  //  < 1
  if (Math.abs(value) >= 1 || value === 0) {
    return Math.round(value).toString();
  }
  return value
    .toFixed(maxDigits)
    .replace(/\.?0+$/, '');
}

/**
 * `0.3375` → `"34%"``0.015` → `"1.5%"`
 */
export function formatAffixPercent(value: number): string {
  if (!Number.isFinite(value)) return '0%';
  const pct = value * 100;
  //  1%  1  0
  if (Math.abs(pct) < 1 && pct !== 0) {
    return `${pct.toFixed(1).replace(/\.?0+$/, '')}%`;
  }
  return `${Math.round(pct)}%`;
}
