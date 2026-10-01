import { resolveItemPresentation } from './presentation/registry';
import type { DisplayItem } from './presentation/types';
export type { DisplayItem } from './presentation/types';


export function itemPresentation(item: DisplayItem) {
  return resolveItemPresentation(item).summary;
}
