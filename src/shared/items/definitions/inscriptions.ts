import { DAO_FORMATION_INSCRIPTIONS_V1 } from '../../engine/combat-v6/equipment/content';

export const INSCRIPTION_MAX_LEVEL = 11;
export const inscriptionItemId = (patternId: string, level: number) =>
  `inscription.${patternId}.${level}`;


export const INSCRIPTION_ITEMS = DAO_FORMATION_INSCRIPTIONS_V1.flatMap(
  (pattern) =>
    Array.from({ length: INSCRIPTION_MAX_LEVEL }, (_, index) => ({
      id: inscriptionItemId(pattern.id, index + 1),
      name: pattern.name,
      kind: 'inscription' as const,
      patternId: pattern.id,
      level: index + 1,
      stackLimit: 99,
    })),
);
