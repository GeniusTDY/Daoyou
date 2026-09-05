import { generateAiArray } from '@server/utils/aiClient';
import {
  MATERIAL_TYPE_VALUES,
  QUALITY_VALUES,
  type MaterialType,
  type Quality,
} from '@shared/types/constants';
import {
  BASE_PRICES,
  QUALITY_CHANCE_MAP,
  QUALITY_TO_RANK,
  QUANTITY_RANGE_MAP,
  RANK_TO_QUALITY,
  TYPE_CHANCE_MAP,
  TYPE_MULTIPLIERS,
} from './config';
import { getFallbackMaterialPreset } from './fallbackPresets';
import {
  getMaterialGenerationPrompt,
  getMaterialGenerationUserPrompt,
} from './prompts';
import {
  MaterialAISchema,
  type GeneratedMaterial,
  type MaterialRandomOptions,
  type MaterialSkeleton,
} from './types';

export class MaterialGenerator {
  /**
   *
   * @param count
   * @param options
   */
  public static async generateRandom(
    count: number = 10,
    options: MaterialRandomOptions = {},
  ): Promise<GeneratedMaterial[]> {
    // 1.
    const skeletons = this.generateRandomSkeletons(count, options);
    // 2.  (AI)
    return this.fillMaterialDetails(skeletons);
  }

  /**
   *  ()
   *
   * @param skeletons
   */
  public static async generateFromSkeletons(
    skeletons: MaterialSkeleton[],
  ): Promise<GeneratedMaterial[]> {
    if (skeletons.some((skeleton) => skeleton.type === 'seed')) {
      throw new Error('灵植种子必须使用 SpiritSeedGenerator 生成');
    }
    return this.fillMaterialDetails(skeletons);
  }

  // ===== Private Core Logic =====

  /**
   *  AI  Name, Description, Element
   */
  private static async fillMaterialDetails(
    skeletons: MaterialSkeleton[],
  ): Promise<GeneratedMaterial[]> {
    if (skeletons.length === 0) return [];

    const prompt = getMaterialGenerationPrompt();
    const userPrompt = getMaterialGenerationUserPrompt(skeletons);
    try {
      const aiResponse = await generateAiArray({
        system: prompt,
        prompt: userPrompt,
        elementSchema: MaterialAISchema,
        name: 'MaterialTextList',
        sceneId: 'material-generation',
      });

      
      return skeletons.map((skeleton, index) => {
        const aiData = aiResponse.output[index] || {
          name: '未知材料',
          description: '天道感应模糊...',
          element: skeleton.forcedElement || '金',
        };

        //  AI
        const finalElement = skeleton.forcedElement || aiData.element;

        
        const price = this.calculatePrice(skeleton.rank, skeleton.type);

        return {
          name: aiData.name,
          type: skeleton.type,
          rank: skeleton.rank,
          element: finalElement,
          description: aiData.description,
          quantity: skeleton.quantity,
          price,
        };
      });
    } catch (error) {
      console.error('Material Generation Failed:', error);
      // AI
      return this.buildFallbackMaterials(skeletons);
    }
  }

  private static buildFallbackMaterials(
    skeletons: MaterialSkeleton[],
  ): GeneratedMaterial[] {
    return skeletons.map((skeleton) => {
      const preset = getFallbackMaterialPreset(skeleton.type, skeleton.rank);
      const finalElement = skeleton.forcedElement || preset.element;
      return {
        name: preset.name,
        type: skeleton.type,
        rank: skeleton.rank,
        element: finalElement,
        description: preset.description,
        quantity: skeleton.quantity,
        price: this.calculatePrice(skeleton.rank, skeleton.type),
      };
    });
  }

  public static generateRandomSkeletons(
    count: number,
    options: MaterialRandomOptions = {},
    rng: () => number = Math.random,
  ): MaterialSkeleton[] {
    if (options.specifiedType === 'seed') {
      throw new Error('灵植种子必须使用 SpiritSeedGenerator 生成');
    }
    const skeletons: MaterialSkeleton[] = [];

    for (let i = 0; i < count; i++) {
      // 1.
      const rank =
        options.guaranteedRank ||
        this.randomQuality(
          {
            qualityChanceMap: options.qualityChanceMap,
            rankRange: options.rankRange,
          },
          rng,
        );

      // 2.
      const type =
        options.specifiedType || this.randomType(options.regionTags, rng);

      // 3.
      const [min, max] = QUANTITY_RANGE_MAP[rank] || [1, 1];
      const quantity = Math.floor(rng() * (max - min + 1)) + min;

      skeletons.push({
        type,
        rank,
        quantity,
        forcedElement: options.specifiedElement,
      });
    }

    return skeletons;
  }

  private static randomQuality(
    options: Pick<MaterialRandomOptions, 'qualityChanceMap' | 'rankRange'> = {},
    rng: () => number = Math.random,
  ): Quality {
    if (options.qualityChanceMap) {
      return this.rollQualityByChanceMap(options.qualityChanceMap, rng);
    }

    const { rankRange } = options;
    if (rankRange) {
      const minRank = QUALITY_TO_RANK[rankRange.min];
      const maxRank = QUALITY_TO_RANK[rankRange.max];
      const normalizedMin = Math.min(minRank, maxRank);
      const normalizedMax = Math.max(minRank, maxRank);
      const roll =
        Math.floor(rng() * (normalizedMax - normalizedMin + 1)) + normalizedMin;
      return RANK_TO_QUALITY[roll];
    }

    return this.rollQualityByChanceMap(QUALITY_CHANCE_MAP, rng);
  }

  private static rollQualityByChanceMap(
    qualityChanceMap: Record<Quality, number>,
    rng: () => number = Math.random,
  ): Quality {
    const rand = rng();
    let accumulated = 0;
    for (const quality of QUALITY_VALUES) {
      accumulated += qualityChanceMap[quality] || 0;
      if (rand <= accumulated) return quality;
    }
    return '凡品';
  }

  private static randomType(
    regionTags?: string[],
    rng: () => number = Math.random,
  ): MaterialType {
    const weightedMap = this.getTypeChanceMapByRegion(regionTags);
    const rand = rng();
    let accumulated = 0;
    for (const type of MATERIAL_TYPE_VALUES) {
      accumulated += weightedMap[type] || 0;
      if (rand <= accumulated) return type;
    }
    return 'herb';
  }

  private static getTypeChanceMapByRegion(
    regionTags?: string[],
  ): Record<MaterialType, number> {
    if (!regionTags || regionTags.length === 0) {
      return TYPE_CHANCE_MAP;
    }

    const next = { ...TYPE_CHANCE_MAP };
    const normalizedTags = regionTags.map((tag) => tag.toLowerCase());

    const boost = (type: MaterialType, factor: number) => {
      next[type] = Math.max(0, next[type] * factor);
    };

    // :
    if (normalizedTags.some((tag) => tag.includes('元武国'))) {
      boost('ore', 1.2);
      boost('aux', 1.25);
    }

    // ·:
    if (
      normalizedTags.some(
        (tag) =>
          tag.includes('乱星海') ||
          tag.includes('奇渊岛') ||
          tag.includes('海'),
      )
    ) {
      boost('monster', 1.35);
      boost('ore', 1.15);
    }

    // ·:
    if (
      normalizedTags.some(
        (tag) =>
          tag.includes('溪国') || tag.includes('云梦') || tag.includes('山脉'),
      )
    ) {
      boost('herb', 1.35);
      boost('aux', 1.15);
    }

    const sum = MATERIAL_TYPE_VALUES.reduce((acc, type) => acc + next[type], 0);
    if (sum <= 0) return TYPE_CHANCE_MAP;

    for (const type of MATERIAL_TYPE_VALUES) {
      next[type] = next[type] / sum;
    }
    return next;
  }

  private static calculatePrice(rank: Quality, type: MaterialType): number {
    const base = BASE_PRICES[rank];
    const multiplier = TYPE_MULTIPLIERS[type] || 1.0;
    const variation = 0.8 + Math.random() * 0.4; // +/- 20%
    let price = Math.floor(base * multiplier * variation);

    if (price > 1000) price = Math.floor(price / 100) * 100;
    else if (price > 100) price = Math.floor(price / 10) * 10;

    return Math.max(1, price);
  }
}
