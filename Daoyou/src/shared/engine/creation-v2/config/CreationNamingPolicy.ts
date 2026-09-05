/**
 * CreationNamingPolicy
 *  —  NamingRules
 */
import { getEquipmentSlotConceptLabel } from '@shared/lib/gameConceptDisplay';


export const CREATION_SKILL_NAMING = {
  
  defaultPrefix: '玄灵',
  
  nameSuffix: '剑法',
} as const;


export const CREATION_ARTIFACT_NAMING = {
  
  defaultName: '灵器',
  
  slotSuffix: '法宝',
} as const;

export function getArtifactSlotDisplayName(slot: string): string {
  return getEquipmentSlotConceptLabel(slot, 'naming');
}


export const CREATION_GONGFA_NAMING = {
  
  nameSuffix: '心法',
  
  defaultName: '玄灵心法',
} as const;


export const CREATION_DESCRIPTION_TEMPLATE = {
  
  materialListPrefix: '由',
  
  materialListSuffix: '炼制而成',
} as const;
