import type {
  Artifact,
  Consumable,
  CultivationProgress,
  Material,
} from '@shared/types/cultivator';

/**
 *
 *
 *
 * - spirit_stones:
 * - reputation:
 * - lifespan:
 * - cultivation_exp:
 * - comprehension_insight:
 * - material:
 * - artifact:
 * - consumable:
 *
 *
 * - hp_loss:  condition
 * - mp_loss:  condition
 * - battle:
 */
export type ResourceType =
  | 'spirit_stones'
  | 'reputation'
  | 'lifespan'
  | 'cultivation_exp'
  | 'comprehension_insight'
  | 'material'
  | 'artifact'
  | 'consumable'
  // 副本特有类型
  | 'hp_loss'
  | 'mp_loss'
  | 'battle';


export interface ResourceOperation {
  type: ResourceType;
  value: number; 
  name?: string; // //
  data?: Partial<Material> | Partial<Artifact> | Partial<Consumable>; 
  metadata?: Record<string, unknown>; 
}


export interface ResourceValidationResult {
  valid: boolean;
  missing?: ResourceOperation[]; 
  errors?: string[];
}


export interface ResourceOperationResult {
  success: boolean;
  operations: ResourceOperation[];
  errors?: string[];
  settlement?: ResourceOperationSettlement;
}

export interface ResourceOperationSettlement {
  activeCultivatorDepleted?: boolean;
  spiritStones?: number;
  reputation?: number;
  lifespan?: number;
  cultivationProgress?: CultivationProgress;
  inventoryChanges: Array<
    | {
        kind: 'artifacts';
        operation: 'upsert';
        item: Artifact;
      }
    | {
        kind: 'materials';
        operation: 'upsert';
        item: Material;
      }
    | {
        kind: 'consumables';
        operation: 'upsert';
        item: Consumable;
      }
    | {
        kind: 'artifacts' | 'materials' | 'consumables';
        operation: 'remove';
        id: string;
      }
  >;
}
