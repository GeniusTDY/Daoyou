/**
 *  -
 *
 *  AI  ResourceOperation
 *
 *
 * :
 * -  artifact  consumable
 * -  dangerScore
 * -  AI
 */

import type { ResourceOperation } from '@shared/engine/resource/types';
import { YieldCalculator } from '@shared/engine/yield/YieldCalculator';
import { calculateDungeonExp } from '@shared/engine/cultivation/ExpBudgetCalculator';
import {
  getDungeonRewardBonus,
  type DungeonDifficultyTier,
} from '@shared/lib/game/mapSystem';
import type {
  ElementType,
  MaterialType,
  Quality,
  RealmStage,
  RealmType,
} from '@shared/types/constants';
import { QUALITY_VALUES } from '@shared/types/constants';
import type { Material } from '@shared/types/cultivator';
import type { PlayerInfo } from '../types';
import {
  REALM_QUALITY_CAP,
  REALM_REWARD_CONFIG,
  TIER_MULTIPLIER,
} from './rewardConfig';
import type { RewardBlueprint, RewardRangeConfig, ValueRange } from './types';

/**
 *  -  AI
 */
export class RewardFactory {
  /**
   *
   *
   * S: ++
   * A: +
   * B: +
   * C:
   * D:
   *
   * @param mapRealm
   * @param tier  (S/A/B/C/D)
   * @param dangerScore  (0-100)
   * @param playerInfo
   * @returns
   */
  static generateBaseRewards(
    mapRealm: RealmType,
    tier: string,
    dangerScore: number,
    playerInfo: PlayerInfo,
    difficultyTier?: DungeonDifficultyTier,
  ): ResourceOperation[] {
    const config = REALM_REWARD_CONFIG[mapRealm] || REALM_REWARD_CONFIG['筑基'];
    const dangerBonus = this.getDangerBonus(dangerScore);
    const rewardBonus = getDungeonRewardBonus(difficultyTier);
    const rewards: ResourceOperation[] = [];

    // 1.  ()
    const rewardHours = this.rollRewardHoursByTier(tier);
    const yieldOps = YieldCalculator.calculateRealmYield(mapRealm, rewardHours);
    const spiritStones =
      yieldOps.find((op) => op.type === 'spirit_stones')?.value ?? 0;
    if (spiritStones > 0) {
      rewards.push({
        type: 'spirit_stones',
        value: Math.floor(
          spiritStones * (1 + dangerBonus * 0.35) * rewardBonus,
        ),
      });
    }

    // 2.  dungeon
    const realmStr = playerInfo.realm.split(' ')[0] as RealmType;
    const stageStr = (playerInfo.realm.split(' ')[1] || '初期') as RealmStage;
    const cultivationExp = calculateDungeonExp(
      realmStr,
      stageStr,
      tier,
      dangerBonus,
    );

    if (cultivationExp > 0) {
      rewards.push({
        type: 'cultivation_exp',
        value: Math.floor(cultivationExp * rewardBonus),
      });
    }

    // 3.  (A S )
    if (tier === 'S' || tier === 'A') {
      const multiplier = TIER_MULTIPLIER[tier] || TIER_MULTIPLIER['C'];
      const insightValue = this.randomInRange(
        config.comprehension_insight,
        tier === 'A'
          ? { min: multiplier.min * 0.5, max: multiplier.max * 0.65 }
          : multiplier,
        dangerBonus,
      );
      rewards.push({
        type: 'comprehension_insight',
        value: Math.max(
          1,
          Math.floor(insightValue * rewardBonus),
        ),
      });
    }

    return rewards;
  }

  /**
   * “”
   *
   * D/C/B/A/S -> 3/4-5/6-7/8-10/11-12
   */
  private static rollRewardHoursByTier(tier: string): number {
    const hourRangeByTier: Record<string, { min: number; max: number }> = {
      D: { min: 3, max: 3 },
      C: { min: 4, max: 5 },
      B: { min: 6, max: 7 },
      A: { min: 8, max: 10 },
      S: { min: 11, max: 12 },
    };

    const range = hourRangeByTier[tier] || hourRangeByTier.C;
    return Math.floor(range.min + Math.random() * (range.max - range.min + 1));
  }

  /**
   *  AI  ResourceOperation
   */
  static materialize(
    blueprints: RewardBlueprint[],
    mapRealm: RealmType,
    tier: string,
    dangerScore: number, // 新增：危险分数 0-100
  ): ResourceOperation[] {
    return blueprints.map((bp) =>
      this.materializeOne(bp, mapRealm, tier, dangerScore),
    );
  }

  /**
   *  +
   *
   * @param blueprints AI
   * @param mapRealm
   * @param tier  (S/A/B/C/D)
   * @param dangerScore  (0-100)
   * @param playerInfo
   * @returns
   */
  static generateAllRewards(
    blueprints: RewardBlueprint[],
    mapRealm: RealmType,
    tier: string,
    dangerScore: number,
    playerInfo: PlayerInfo,
    difficultyTier?: DungeonDifficultyTier,
  ): ResourceOperation[] {
    
    const baseRewards = this.generateBaseRewards(
      mapRealm,
      tier,
      dangerScore,
      playerInfo,
      difficultyTier,
    );

    
    const materialRewards = this.materialize(
      blueprints,
      mapRealm,
      tier,
      dangerScore,
    );

    
    return [...baseRewards, ...materialRewards];
  }

  /**
   *  AI  ResourceOperation
   */
  private static materializeOne(
    blueprint: RewardBlueprint,
    mapRealm: RealmType,
    tier: string,
    dangerScore: number,
  ): ResourceOperation {
    const config = REALM_REWARD_CONFIG[mapRealm] || REALM_REWARD_CONFIG['筑基'];
    const multiplier = TIER_MULTIPLIER[tier] || TIER_MULTIPLIER['C'];
    const dangerBonus = this.getDangerBonus(dangerScore);
    return this.createMaterial(
      blueprint,
      config,
      multiplier,
      dangerBonus,
      mapRealm,
      tier,
    );
  }

  // ============  ============

  
  private static createMaterial(
    bp: RewardBlueprint,
    config: RewardRangeConfig,
    multiplier: ValueRange,
    dangerBonus: number,
    mapRealm: RealmType,
    tier: string,
  ): ResourceOperation {
    
    const quality = this.rollMaterialQuality(
      mapRealm,
      tier,
      dangerBonus * 200, // 转换回 0-100 的危险分数
      bp.reward_score ?? 50,
    );
    
    const element = bp.element || this.inferElement(bp.description || '');
    const materialType = this.resolveMaterialType(
      bp.material_type,
      bp.description || '',
    );

    
    const basePrice = this.randomInRange(
      config.material_price,
      multiplier,
      dangerBonus,
    );

    const material: Material = {
      name: bp.name || '未知材料',
      type: materialType,
      rank: quality,
      element,
      description: bp.description || '',
      price: Math.floor(basePrice * (1 + dangerBonus * 0.1)), // 危险分数增加价值
      quantity: 1,
    };

    return {
      type: 'material',
      value: 1,
      name: material.name,
      data: material,
    };
  }

  // ============  ============

  /**
   *  (0-100 -> 0-0.5)
   */
  private static getDangerBonus(dangerScore: number): number {
    return dangerScore / 200;
  }

  
  private static randomInRange(
    range: ValueRange,
    multiplier: ValueRange,
    dangerBonus: number,
  ): number {
    const span = range.max - range.min;
    const effectiveMin = range.min + span * multiplier.min;
    const effectiveMax = range.min + span * multiplier.max;
    const base = effectiveMin + Math.random() * (effectiveMax - effectiveMin);
    return Math.floor(base * (1 + dangerBonus));
  }

  
  private static inferElement(description: string): ElementType {
    const lowerDesc = description.toLowerCase();
    const elementMap: Record<string, ElementType> = {
      火: '火',
      焰: '火',
      炎: '火',
      焚: '火',
      水: '水',
      冰: '冰',
      寒: '冰',
      霜: '冰',
      木: '木',
      草: '木',
      藤: '木',
      林: '木',
      花: '木',
      铁: '金',
      剑: '金',
      锐: '金',
      土: '土',
      石: '土',
      岩: '土',
      山: '土',
      雷: '雷',
      电: '雷',
      霆: '雷',
      风: '风',
      气: '风',
      云: '风',
    };

    for (const [keyword, element] of Object.entries(elementMap)) {
      if (lowerDesc.includes(keyword)) return element;
    }

    
    const elements: ElementType[] = ['金', '木', '水', '火', '土'];
    return elements[Math.floor(Math.random() * elements.length)];
  }

  
  private static rollMaterialQuality(
    mapRealm: RealmType,
    tier: string,
    dangerScore: number,
    rewardScore: number = 50,
  ): Quality {
    const capQuality = REALM_QUALITY_CAP[mapRealm] || '神品';
    const capIndex = QUALITY_VALUES.indexOf(capQuality);
    const safeRewardScore =
      Number.isFinite(rewardScore) && rewardScore >= 0 && rewardScore <= 100
        ? rewardScore
        : 50;
    const safeDangerScore =
      Number.isFinite(dangerScore) && dangerScore >= 0 && dangerScore <= 100
        ? dangerScore
        : 50;
    const tierRarityBias: Record<string, number> = {
      S: 0.12,
      A: 0.06,
      B: 0,
      C: -0.06,
      D: -0.12,
    };
    
    const rarityBias =
      ((safeRewardScore - 50) / 50) * 0.9 +
      (tierRarityBias[tier] ?? 0) +
      ((safeDangerScore - 50) / 50) * 0.06;
    const baseChanceMap =
      YieldCalculator.getMaterialQualityChanceMap(mapRealm);
    const weightedQualities = QUALITY_VALUES.map((quality, index) => ({
      quality,
      weight:
        index <= capIndex
          ? baseChanceMap[quality] * Math.exp(index * rarityBias)
          : 0,
    }));
    const totalWeight = weightedQualities.reduce(
      (total, entry) => total + entry.weight,
      0,
    );
    let roll = Math.random() * totalWeight;
    let fallbackQuality: Quality = QUALITY_VALUES[0];

    for (const entry of weightedQualities) {
      if (entry.weight <= 0) continue;
      fallbackQuality = entry.quality;
      roll -= entry.weight;
      if (roll <= 0) return entry.quality;
    }

    return fallbackQuality;
  }

  
  private static resolveMaterialType(
    materialType: RewardBlueprint['material_type'] | undefined,
    description: string,
  ): MaterialType {
    // 1.
    if (materialType) {
      return materialType as MaterialType;
    }

    // 2.
    const lowerDesc = description.toLowerCase();

    
    if (
      lowerDesc.includes('神通') ||
      lowerDesc.includes('秘术') ||
      lowerDesc.includes('术法')
    ) {
      return 'skill_manual';
    }

    
    if (
      lowerDesc.includes('功法') ||
      lowerDesc.includes('心法') ||
      lowerDesc.includes('经') ||
      lowerDesc.includes('诀')
    ) {
      return 'gongfa_manual';
    }

    
    if (
      lowerDesc.includes('草') ||
      lowerDesc.includes('药') ||
      lowerDesc.includes('灵芝') ||
      lowerDesc.includes('参')
    ) {
      return 'herb';
    }

    
    if (
      lowerDesc.includes('石') ||
      lowerDesc.includes('矿') ||
      lowerDesc.includes('晶') ||
      lowerDesc.includes('铁')
    ) {
      return 'ore';
    }

    
    if (
      lowerDesc.includes('兽') ||
      lowerDesc.includes('妖') ||
      lowerDesc.includes('血') ||
      lowerDesc.includes('骨')
    ) {
      return 'monster';
    }

    
    if (
      lowerDesc.includes('果') ||
      lowerDesc.includes('宝') ||
      lowerDesc.includes('珠') ||
      lowerDesc.includes('露')
    ) {
      return 'tcdb';
    }

    
    return 'aux';
  }
}
