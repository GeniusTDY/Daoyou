import type { Attributes } from '@shared/types/cultivator';

/** speed  speed  */
export const CHARACTER_ATTRIBUTE_LABELS = {
  vitality: '体魄',
  strength: '力道',
  spirit: '灵力',
  endurance: '根骨',
  speed: '身法',
  willpower: '神识',
} as const satisfies Record<keyof Attributes, string>;
