import type { Context } from 'hono';
import type { AppEnv } from '@server/lib/hono/types';
import { isAllowedPublicWebOrigin, isTrustedOrigin, normalizeOrigin } from './origins';

export const apiCorsOptions = {
  origin: (origin: string, c: Context<AppEnv>) => {
    if (!origin || origin === 'null') {
      return null;
    }
    const normalized = normalizeOrigin(origin);
    const getHeader = (name: string) => c.req.header(name);
    if (!normalized) {
      return null;
    }
    return isAllowedPublicWebOrigin(normalized) || isTrustedOrigin(normalized, getHeader)
      ? normalized
      : null;
  },
  allowHeaders: [
    'Content-Type',
    'Authorization',
    'Idempotency-Key',
    'x-altcha-payload',
    'x-llm-api-key',
    'x-llm-model',
    'x-llm-provider',
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  maxAge: 600,
};