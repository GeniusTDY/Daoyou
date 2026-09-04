import type { AppEnv } from '@server/lib/hono/types';
import { isTrustedOrigin } from './origins';
import type { MiddlewareHandler } from 'hono';

const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function isAllowedWriteOrigin(
  origin: string | undefined | null,
  getHeader: (name: string) => string | undefined | null,
) {
  if (!origin) {
    return true;
  }
  return isTrustedOrigin(origin, getHeader);
}

export function unsafeRequestOriginGuard(): MiddlewareHandler<AppEnv> {
  return async (context, next) => {
    if (!UNSAFE_METHODS.has(context.req.method.toUpperCase())) {
      await next();
      return;
    }

    const secFetchSite = context.req.header('sec-fetch-site');
    if (secFetchSite === 'cross-site') {
      return context.json({ success: false, error: 'Forbidden origin' }, 403);
    }

    const getHeader = (name: string) => context.req.header(name);
    if (!isAllowedWriteOrigin(context.req.header('origin'), getHeader)) {
      return context.json({ success: false, error: 'Forbidden origin' }, 403);
    }

    await next();
  };
}

export const originGuardInternals = {
  isAllowedWriteOrigin,
};
