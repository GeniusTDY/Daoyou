import { cultivators } from '@server/lib/drizzle/schema';
import type { DbTransaction } from '@server/lib/drizzle/db';
import { invalidateActiveCultivatorRef } from '@server/lib/hono/middleware';
import { findActiveCultivatorOwnerId } from '@server/lib/repositories/cultivatorRepository';
import { updateCultivator } from '@server/lib/services/cultivator/CultivatorStateRepository';
import type { BreakthroughModifiers } from '@server/utils/breakthroughCalculator';
import type {
  LifespanExhaustedStoryPayload,
  RetreatStoryCultivator,
} from '@server/utils/prompts';
import { RealmStage, RealmType } from '@shared/types/constants';
import { eq } from 'drizzle-orm';

export interface ConsumeLifespanResult {
  depleted: boolean;
  storyPayload?: LifespanExhaustedStoryPayload;
  afterCommit?: () => Promise<void>;
}

/**
 *
 * - age + years >= lifespan status  'dead'
 * -
 */
export async function consumeLifespanAndHandleDepletion(
  cultivatorId: string,
  years: number,
  options: {
    tx: DbTransaction;
    /**  years */
    ageAfterConsumption?: number;
    storyCultivator: RetreatStoryCultivator;
  },
): Promise<ConsumeLifespanResult> {
  if (years <= 0) {
    return { depleted: false };
  }

  const [cultivator] = await options.tx
    .select({
      age: cultivators.age,
      lifespan: cultivators.lifespan,
      realm: cultivators.realm,
      realmStage: cultivators.realm_stage,
    })
    .from(cultivators)
    .where(eq(cultivators.id, cultivatorId))
    .limit(1);
  if (!cultivator) {
    return { depleted: false };
  }

  const newAge = options.ageAfterConsumption ?? (cultivator.age || 0) + years;

  
  if (newAge >= (cultivator.lifespan || 0)) {
    //  age
    let afterCommit: (() => Promise<void>) | undefined;
    try {
      const ownerId = await findActiveCultivatorOwnerId(
        cultivatorId,
        options.tx,
      );
      await updateCultivator(
        cultivatorId,
        {
          age: newAge,
          status: 'dead',
        },
        options.tx,
      );
      if (ownerId) {
        afterCommit = () => invalidateActiveCultivatorRef(ownerId);
      }
    } catch (err) {
      console.error('更新角色为死时失败：', err);
    }

    const storyCultivator = {
      ...options.storyCultivator,
      age: newAge,
      status: 'dead' as const,
    };

    return {
      depleted: true,
      storyPayload: {
        // todo
        cultivator: storyCultivator,
        summary: {
          success: false,
          isMajor: false,
          yearsSpent: years,
          chance: 0,
          roll: 0,
          fromRealm: cultivator.realm as RealmType,
          fromStage: cultivator.realmStage as RealmStage,
          lifespanGained: 0,
          attributeGrowth: {},
          attributePointReward: 0,
          lifespanDepleted: true,
          modifiers: {} as BreakthroughModifiers,
        },
      },
      afterCommit,
    };
  }

  return { depleted: false };
}
