


export const ELEMENT_VALUES = [
  '金',
  '木',
  '水',
  '火',
  '土',
  '风',
  '雷',
  '冰',
] as const;
export type ElementType = (typeof ELEMENT_VALUES)[number];


export const SKILL_TYPE_VALUES = [
  'attack',
  'heal',
  'control',
  'debuff',
  'buff',
] as const;
export type SkillType = (typeof SKILL_TYPE_VALUES)[number];


export const STATUS_EFFECT_VALUES = [
  //  - Buff
  'armor_up',
  'speed_up',
  'crit_rate_up',
  //  - Debuff
  'armor_down',
  'crit_rate_down',
  //  - Control
  'stun',
  'silence',
  'root',
  //  - DOT
  'burn',
  'bleed',
  'poison',
  
  'weakness',
  'minor_wound',
  'major_wound',
  'near_death',
  'breakthrough_focus',
  'protect_meridians',
  'clear_mind',
  'cultivation_boost',
  'artifact_damaged',
  'mana_depleted',
  'hp_deficit',
  
  'scorching',
  'freezing',
  'toxic_air',
  'formation_suppressed',
  'abundant_qi',
] as const;
export type StatusEffect = (typeof STATUS_EFFECT_VALUES)[number];


export const EQUIPMENT_SLOT_VALUES = ['weapon', 'armor', 'accessory'] as const;
export type EquipmentSlot = (typeof EQUIPMENT_SLOT_VALUES)[number];


export const CONSUMABLE_TYPE_VALUES = ['丹药', '符箓', '灵果'] as const;
export type ConsumableType = (typeof CONSUMABLE_TYPE_VALUES)[number];


export const GENDER_VALUES = ['男', '女'] as const;
export type GenderType = (typeof GENDER_VALUES)[number];


export const ENEMY_RACE_VALUES = [
  '人族',
  '妖族',
  '鬼魂',
  '魔族',
  '古兽',
  '灵族',
] as const;
export type EnemyRace = (typeof ENEMY_RACE_VALUES)[number];


export const REALM_VALUES = [
  '炼气',
  '筑基',
  '金丹',
  '元婴',
  '化神',
  '炼虚',
  '合体',
  '大乘',
  '渡劫',
] as const;
export type RealmType = (typeof REALM_VALUES)[number];


export const REALM_STAGE_VALUES = ['初期', '中期', '后期', '圆满'] as const;
export type RealmStage = (typeof REALM_STAGE_VALUES)[number];


export const FATE_TYPE_VALUES = ['吉', '凶'] as const;
export type FateType = (typeof FATE_TYPE_VALUES)[number];


export const SPIRITUAL_ROOT_GRADE_VALUES = [
  '天灵根',
  '真灵根',
  '伪灵根',
  '变异灵根',
] as const;
export type SpiritualRootGrade = (typeof SPIRITUAL_ROOT_GRADE_VALUES)[number];

// /
export const SKILL_GRADE_VALUES = [
  '天阶上品',
  '天阶中品',
  '天阶下品',
  '地阶上品',
  '地阶中品',
  '地阶下品',
  '玄阶上品',
  '玄阶中品',
  '玄阶下品',
  '黄阶上品',
  '黄阶中品',
  '黄阶下品',
] as const;
export type SkillGrade = (typeof SKILL_GRADE_VALUES)[number];


export const QUALITY_VALUES = [
  '凡品',
  '灵品',
  '玄品',
  '真品',
  '地品',
  '天品',
  '仙品',
  '神品',
] as const;
export type Quality = (typeof QUALITY_VALUES)[number];


export const QUALITY_ORDER: Record<Quality, number> = {
  凡品: 0,
  灵品: 1,
  玄品: 2,
  真品: 3,
  地品: 4,
  天品: 5,
  仙品: 6,
  神品: 7,
};


export const REALM_ORDER: Record<RealmType, number> = {
  炼气: 0,
  筑基: 1,
  金丹: 2,
  元婴: 3,
  化神: 4,
  炼虚: 5,
  合体: 6,
  大乘: 7,
  渡劫: 8,
};


export const MATERIAL_TYPE_VALUES = [
  'seed',
  'herb',
  'ore',
  'monster',
  'tcdb',
  'aux',
  'gongfa_manual',
  'skill_manual',
] as const;
export type MaterialType = (typeof MATERIAL_TYPE_VALUES)[number];

// =====  =====


export const REALM_YIELD_RATES: Record<RealmType, number> = {
  炼气: 100,
  筑基: 200,
  金丹: 400,
  元婴: 800,
  化神: 1600,
  炼虚: 3200,
  合体: 4800,
  大乘: 6400,
  渡劫: 12800,
};


export const RANKING_REWARDS = {
  1: 100,
  '2-10': 50,
  '11-50': 25,
  '51-100': 15,
};
