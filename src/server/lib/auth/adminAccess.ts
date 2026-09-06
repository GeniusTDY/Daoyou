function parseCommaSeparatedEnv(
  name: 'ADMIN_EMAILS' | 'ADMIN_USER_IDS' | 'ADMIN_DAOHAOS',
) {
  return (process.env[name] ?? '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function getAdminUserIds(): string[] {
  return parseCommaSeparatedEnv('ADMIN_USER_IDS');
}

export function isAdminUserId(userId?: string | null): boolean {
  if (!userId) return false;
  return getAdminUserIds().includes(userId.toLowerCase());
}

export function getAdminDaohaos(): string[] {
  return parseCommaSeparatedEnv('ADMIN_DAOHAOS');
}

export function isAdminDaohao(daohao?: string | null): boolean {
  if (!daohao) return false;
  // 注册时 user.name 即道号，且系统不支持改道号，因此可直接按道号登记管理员，
  // 不依赖 email 内部标识，避免用户感知到邮箱映射。
  return getAdminDaohaos().includes(daohao.toLowerCase());
}

export function isLegacyAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return parseCommaSeparatedEnv('ADMIN_EMAILS').includes(email.toLowerCase());
}

export function isAdminIdentity(user?: {
  id?: string | null;
  email?: string | null;
  name?: string | null;
}): boolean {
  return (
    isAdminUserId(user?.id) ||
    isLegacyAdminEmail(user?.email) ||
    isAdminDaohao(user?.name)
  );
}
