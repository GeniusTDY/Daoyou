import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { i18n, type TranslationDictionary } from '@better-auth/i18n';
import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins/admin';
import { db } from '../drizzle/db';
import { deriveOriginFromHeaders, getPublicWebOrigins } from '../http/origins';
import {
  markAccountDeletionCompleted,
  recordPendingAccountDeletion,
} from '../repositories/accountDeletionRepository';
import { getAdminUserIds } from './adminAccess';
import { getCookieDomainConfig } from './cookieDomain';
import { BETTER_AUTH_SCHEMA_NAME, betterAuthSchema } from './schema';

function getRequiredEnv(name: 'BETTER_AUTH_SECRET' | 'BETTER_AUTH_URL') {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing Better Auth config: ${name}`);
  }

  return value;
}

/**
 * “”
 *
 * Better Auth  email  z.email()
 *  UTF-8  [0-9a-f]
 *  local part`u_<hex>@xiantu.local`
 *  user.name
 *  src/react-app/lib/auth/authState.ts
 */
export function daohaoToAuthEmail(daohao: string): string {
  const hex = Array.from(
    new TextEncoder().encode(daohao.trim()),
    (byte) => byte.toString(16).padStart(2, '0'),
  ).join('');

  return `u_${hex}@xiantu.local`;
}

const zhAuthTranslations = {
  USER_NOT_FOUND: '道号或密码错误',
  FAILED_TO_CREATE_SESSION: '登录失败，请稍后重试',
  INVALID_PASSWORD: '道号或密码错误',
  INVALID_EMAIL: '道号格式错误',
  INVALID_EMAIL_OR_PASSWORD: '道号或密码错误',
  PROVIDER_NOT_FOUND: '未找到对应的登录方式',
  INVALID_TOKEN: '凭证无效',
  TOKEN_EXPIRED: '凭证已失效，请重新发起',
  FAILED_TO_GET_USER_INFO: '未能获取用户信息，请稍后重试',
  USER_EMAIL_NOT_FOUND: '未获取到道号',
  EMAIL_NOT_VERIFIED: '道号或密码错误',
  PASSWORD_TOO_SHORT: '密码太短',
  PASSWORD_TOO_LONG: '密码过长',
  USER_ALREADY_EXISTS: '该道号已被占用',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: '该道号已被占用，请更换道号',
  EMAIL_CAN_NOT_BE_UPDATED: '暂不支持修改道号',
  CREDENTIAL_ACCOUNT_NOT_FOUND: '未找到对应的密码登录记录',
  SESSION_EXPIRED: '会话已失效，请重新登录后再试',
  INVALID_CALLBACK_URL: '回传地址无效，请稍后重试',
  INVALID_REDIRECT_URL: '跳转地址无效，请稍后重试',
  INVALID_ERROR_CALLBACK_URL: '错误回传地址无效，请稍后重试',
  INVALID_NEW_USER_CALLBACK_URL: '新用户回传地址无效，请稍后重试',
  CALLBACK_URL_REQUIRED: '缺少回传地址，请稍后重试',
  MISSING_FIELD: '请将信息填写完整',
  PASSWORD_ALREADY_SET: '该账号已设置密码',
  TOO_MANY_ATTEMPTS: '尝试次数过多，请稍后再试',
} satisfies TranslationDictionary;

export const authSchemaName = BETTER_AUTH_SCHEMA_NAME;

export const auth = betterAuth({
  baseURL: getRequiredEnv('BETTER_AUTH_URL'),
  secret: getRequiredEnv('BETTER_AUTH_SECRET'),
  trustedOrigins: (request) => {
    const origins = new Set<string>(getPublicWebOrigins());
    const self = getRequiredEnv('BETTER_AUTH_URL');
    const selfOrigin = new URL(self).origin;
    if (selfOrigin) origins.add(selfOrigin);
    if (request) {
      const dynamic = deriveOriginFromHeaders((name) => request.headers.get(name));
      if (dynamic) origins.add(dynamic);
    }
    return [...origins];
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: betterAuthSchema,
    camelCase: true,
    transaction: true,
  }),
  ...(getCookieDomainConfig()
    ? { crossSubDomainCookies: getCookieDomainConfig() }
    : {}),
  advanced: {
    database: {
      generateId: 'uuid',
    },
  },
  emailAndPassword: {
    enabled: true,
    // +
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    disableSignUp: false,
  },
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        await recordPendingAccountDeletion(user.id);
      },
      afterDelete: async (user) => {
        try {
          await markAccountDeletionCompleted(user.id);
        } catch (error) {
          console.error('[auth] failed to finalize account deletion record', {
            userId: user.id,
            error,
          });
        }
      },
    },
  },
  plugins: [
    i18n({
      defaultLocale: 'zh',
      translations: {
        zh: zhAuthTranslations,
      },
    }),
    admin({
      adminUserIds: getAdminUserIds(),
    }),
  ],
});
