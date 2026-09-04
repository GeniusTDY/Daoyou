import type { RealmStage, RealmType } from '@shared/types/constants';

/**
 *  ×
 *
 *  cap cultivation_exp
 *  cap
 *
 *
 *    cap ≈ REALM_TARGET_DAYS[realm]
 *            × REALM_DAILY_EXP_BUDGET[realm]
 *            × STAGE_EXP_WEIGHT[stage]
 *
 *  ≈ 70 × 9000 × 0.15 = 94500 95000
 *
 *
 * - exp_cap
 * -  exp_cap  daily budget
 *
 *
 * -  cultivationExpGain.ts /
 *
 * -
 *
 * ./cultivationExpGain.ts  REALM_TARGET_DAYS
 * REALM_DAILY_EXP_BUDGET  STAGE_EXP_WEIGHT
 */
export const EXP_CAP_TABLE: Record<RealmType, Record<RealmStage, number>> = {
  炼气: {
    初期: 500,
    中期: 600,
    后期: 800,
    圆满: 1_200,
  },
  筑基: {
    初期: 1_900,
    中期: 2_500,
    后期: 3_200,
    圆满: 5_000,
  },
  金丹: {
    初期: 10_000,
    中期: 13_000,
    后期: 17_000,
    圆满: 27_000,
  },
  元婴: {
    初期: 35_000,
    中期: 47_000,
    后期: 59_000,
    圆满: 94_000,
  },
  化神: {
    初期: 95_000,
    中期: 130_000,
    后期: 160_000,
    圆满: 250_000,
  },
  炼虚: {
    初期: 210_000,
    中期: 270_000,
    后期: 340_000,
    圆满: 550_000,
  },
  合体: {
    初期: 400_000,
    中期: 530_000,
    后期: 660_000,
    圆满: 1_060_000,
  },
  大乘: {
    初期: 690_000,
    中期: 920_000,
    后期: 1_160_000,
    圆满: 1_850_000,
  },
  渡劫: {
    初期: 1_150_000,
    中期: 1_530_000,
    后期: 1_910_000,
    圆满: 3_060_000,
  },
};
