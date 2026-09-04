export function normalizeOrigin(value: string | undefined | null) {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    if (url.pathname !== '/' || url.search || url.hash) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

function splitOrigins(value: string | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((origin) => normalizeOrigin(origin))
    .filter((origin): origin is string => Boolean(origin));
}

export function getPublicWebOrigins() {
  return splitOrigins(process.env.PUBLIC_WEB_ORIGINS);
}

export function isAllowedPublicWebOrigin(origin: string | undefined | null) {
  if (!origin) {
    return true;
  }

  const normalized = normalizeOrigin(origin);
  return Boolean(normalized && getPublicWebOrigins().includes(normalized));
}

export function resolveCorsOrigin(origin: string) {
  const normalized = normalizeOrigin(origin);
  return normalized && isAllowedPublicWebOrigin(normalized) ? normalized : '';
}

type HeaderGetter = (name: string) => string | undefined | null;

function getSelfOrigin() {
  return normalizeOrigin(process.env.BETTER_AUTH_URL);
}

/**
 * “”
 *
 * / Origin
 * X-Forwarded-Host IP/
 */
export function deriveOriginFromHeaders(getHeader: HeaderGetter): string | null {
  const origin = normalizeOrigin(getHeader('origin'));
  if (origin) {
    return origin;
  }

  const host = getHeader('x-forwarded-host') || getHeader('host');
  if (!host) {
    return null;
  }
  const proto = getHeader('x-forwarded-proto')?.split(',')[0]?.trim() || 'http';
  return normalizeOrigin(`${proto}://${host}`);
}

/**
 *  Origin
 *  ∪  BETTER_AUTH_URL ∪
 */
export function isTrustedOrigin(
  origin: string | undefined | null,
  getHeader: HeaderGetter,
): boolean {
  if (!origin) {
    return true;
  }

  const normalized = normalizeOrigin(origin);
  if (!normalized) {
    return false;
  }

  if (getPublicWebOrigins().includes(normalized)) {
    return true;
  }
  if (getSelfOrigin() === normalized) {
    return true;
  }
  return deriveOriginFromHeaders(getHeader) === normalized;
}
