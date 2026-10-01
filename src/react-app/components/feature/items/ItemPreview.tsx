import type { ReactNode } from 'react';
import { ItemPreviewView } from './ItemPreviewView';
import { itemPreviewModel } from './itemPreviewModel';
import type { DisplayItem, PreviewOptions } from './presentation/types';
type PreviewChrome = {
  close?: () => void;
  actions?: ReactNode;
  context?: string;
};


export function ItemPreview({
  item,
  options,
  quantityLabel = '持有',
  ...chrome
}: {
  item: DisplayItem;
  options?: PreviewOptions;
  quantityLabel?: string;
} & PreviewChrome) {
  const model = itemPreviewModel(item, {
    ...options,
    quantityLabel,
  });
  return (
    <div data-item-preview={item.definitionId}>
      <ItemPreviewView model={model} {...chrome} />
    </div>
  );
}
