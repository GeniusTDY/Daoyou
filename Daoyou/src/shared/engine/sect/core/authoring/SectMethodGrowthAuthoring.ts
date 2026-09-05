import type { BuffConfig } from '@shared/engine/battle-v5/core/configs';
import type { SectMethodId } from '../domain';

const SECT_METHOD_GROWTH_KEY = '__sectMethodGrowth';

export interface SectBuffMethodGrowth {
  
  methodId?: SectMethodId;
  
  duration?: boolean;
}

type AuthoredSectBuffConfig = BuffConfig & {
  [SECT_METHOD_GROWTH_KEY]?: SectBuffMethodGrowth;
};

/**
 *  Buff
 *
 *  authoring/battle-v5
 *  BuffConfig
 */
export function withSectBuffMethodGrowth(
  config: BuffConfig,
  growth: SectBuffMethodGrowth,
): BuffConfig {
  return {
    ...config,
    [SECT_METHOD_GROWTH_KEY]: growth,
  } as AuthoredSectBuffConfig;
}

export function consumeSectBuffMethodGrowth(config: BuffConfig): {
  config: BuffConfig;
  growth?: SectBuffMethodGrowth;
} {
  const authored = config as AuthoredSectBuffConfig;
  const growth = authored[SECT_METHOD_GROWTH_KEY];
  const runtimeConfig = structuredClone(authored) as AuthoredSectBuffConfig;
  delete runtimeConfig[SECT_METHOD_GROWTH_KEY];
  return { config: runtimeConfig, growth };
}
