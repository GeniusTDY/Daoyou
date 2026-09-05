import type { AffixView } from './abilityDisplay';
import {
  getAffixToneStyle,
  getAffixUnderlineStyle,
  getPerfectMarkStyle,
} from './affixPresentation';

interface AffixChipProps {
  affix: AffixView;
}

/**
 *  chip /  /  AffixView
 *
 *
 *   -  →
 *   -
 *   -  →
 */
export function AffixChip({ affix }: AffixChipProps) {
  return (
    <li className="flex items-start text-sm leading-relaxed" data-affix-chip={affix.id}>
      <div className="flex-1">
        <span
          className="relative inline-flex max-w-full border-b border-dashed pr-2 pb-px"
          style={getAffixUnderlineStyle(affix.isPerfect)}
        >
          <span
            className="font-medium"
            style={getAffixToneStyle(affix.rarityTone)}
          >
            {affix.name}
          </span>
          {affix.isPerfect && (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-0.5 text-xs font-semibold leading-none"
              data-affix-perfect-mark="embedded"
              style={getPerfectMarkStyle()}
            >
              极
            </span>
          )}
        </span>
        <span className="text-ink-secondary">：</span>
        <span className="text-ink-secondary">{affix.bodyText}</span>
      </div>
    </li>
  );
}
