import {
  ELEMENT_VALUES,
  type ElementType,
  type MaterialType,
  type Quality,
} from '@shared/types/constants';
import type { MaterialDetails } from '@shared/types/cultivator';
import { z } from 'zod';

// AI  AI
export const MaterialAISchema = z.object({
  name: z.string().min(2).max(10).describe('材料名称'),
  description: z.string().min(10).max(100).describe('材料描述'),
  element: z
    .enum(ELEMENT_VALUES)
    .describe('材料的五行属性（金/木/水/火/土/风/雷/冰）'),
});

export type MaterialAIData = z.infer<typeof MaterialAISchema>;


export interface MaterialSkeleton {
  type: MaterialType;
  rank: Quality;
  quantity: number;
  // AI AI
  forcedElement?: ElementType;
}


export interface GeneratedMaterial {
  name: string;
  type: MaterialType;
  rank: Quality;
  element: ElementType;
  description: string;
  details?: MaterialDetails;
  quantity: number;
  price: number;
}


export interface MaterialRandomOptions {
  guaranteedRank?: Quality; 
  specifiedType?: MaterialType; 
  specifiedElement?: ElementType; 
  regionTags?: string[]; 
  qualityChanceMap?: Record<Quality, number>; 
  rankRange?: {
    min: Quality;
    max: Quality;
  }; 
  allowMystery?: boolean; 
  mysteryChance?: number; 
}
