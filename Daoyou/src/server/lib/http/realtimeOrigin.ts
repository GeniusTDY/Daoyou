import { isTrustedOrigin } from './origins';

export function isAllowedRealtimeOrigin(
  origin: string | undefined | null,
  getHeader: (name: string) => string | undefined | null = () => null,
) {
  return isTrustedOrigin(origin, getHeader);
}