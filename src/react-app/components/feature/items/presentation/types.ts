import type { InventoryView } from '@shared/contracts/inventory';
import type { ItemDefinition } from '@shared/items/types';
import type { CultivatorCondition } from '@shared/types/condition';
import type { RealmType } from '@shared/types/constants';

export type DisplayItem = Pick<
  InventoryView['items'][number],
  'name' | 'definitionId' | 'instanceData' | 'quantity'
> & { equipped?: boolean };
export type PreviewTone =
  'normal' | 'accent' | 'positive' | 'warning' | 'muted';
export type PreviewLine = {
  label?: string;
  value: string | number;
  numeric?: boolean;
  tone?: PreviewTone;
};

export type PreviewLineEntry = { kind: 'line' } & PreviewLine;
export type PreviewEntry =
  | PreviewLineEntry
  | {
      kind: 'disclosure';
      title: string;
      tone?: PreviewTone;
      rows: PreviewLine[];
    };
export type PreviewSection = {
  title: string;
  tone?: PreviewTone;
} & (
  | { collapsible: true; entries: PreviewLineEntry[] }
  | { collapsible?: false; entries: PreviewEntry[] }
);
export type HeaderEntry =
  | { kind: 'field'; label: string; value: string | number }
  | { kind: 'quantity'; label: string; value: number }
  | { kind: 'status'; value: string };
export type PreviewOptions = {
  quantityLabel?: string;
  hideQuantity?: boolean;
  realm?: RealmType;
  condition?: CultivatorCondition;
};
export type ItemSummary = {
  icon: string;
  color: string;
  type: string;
  tier: string;
};
export type PreviewContent = {
  header: HeaderEntry[];
  sections: PreviewSection[];
  description?: string;
};
export type ItemPreviewModel = PreviewContent & {
  title: string;
  icon: string;
  titleColor: string;
};
/** resolve  preview  */
export type ItemAdapter = (
  item: DisplayItem,
  definition: ItemDefinition,
) => {
  summary: ItemSummary;
  preview: (options: PreviewOptions) => PreviewContent;
};
