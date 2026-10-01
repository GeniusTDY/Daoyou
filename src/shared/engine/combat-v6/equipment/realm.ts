import {
  getLevelRealmStage,
  getRealmStageLevel,
} from '@shared/config/realmProgression';


export function equipmentRealm(level: number) {
  const { realm } = getLevelRealmStage(level);
  return { realm, requiredLevel: getRealmStageLevel(realm, '初期') };
}

export const EQUIPMENT_LEVELS = [
  10, 30, 50, 70, 90, 110, 130, 150, 170,
] as const;

export function isEquipmentLevel(level: number) {
  return EQUIPMENT_LEVELS.some((value) => value === level);
}


export const OPEN_EQUIPMENT_LEVELS = [10, 30, 50, 70, 90] as const;
export function isOpenEquipmentLevel(level: number) {
  return OPEN_EQUIPMENT_LEVELS.some((value) => value === level);
}

/** /20406080100 */
export function equipmentReferenceLevel(level: number) {
  if (!isOpenEquipmentLevel(level)) throw new Error('该境界道装尚未开放');
  return level + 10;
}
