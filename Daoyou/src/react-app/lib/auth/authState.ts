import { BetterFetchError } from '@better-fetch/fetch';
import { createContext } from 'react';
import { authClient } from './client';

type SessionPayload = typeof authClient.$Infer.Session;
type AuthSession = SessionPayload['session'];
type AuthUser = SessionPayload['user'];

/**
 *
 *
 * Better Auth  email  z.email()
 *  UTF-8  [0-9a-f]
 *  local part`u_<hex>@xiantu.local`
 *  user.name
 *  src/server/lib/auth/auth.ts
 */
export function daohaoToAuthEmail(daohao: string): string {
  const hex = Array.from(
    new TextEncoder().encode(daohao.trim()),
    (byte) => byte.toString(16).padStart(2, '0'),
  ).join('');

  return `u_${hex}@xiantu.local`;
}

export type AuthActionError = {
  code?: string;
  message: string;
  originalMessage?: string;
  status?: number;
  statusText?: string;
};

export interface AuthContextType {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  signUpWithPassword: (
    daohao: string,
    password: string,
  ) => Promise<{ error: AuthActionError | null }>;
  signInWithPassword: (
    daohao: string,
    password: string,
  ) => Promise<{ error: AuthActionError | null }>;
  signOut: () => Promise<{ error: AuthActionError | null }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

/**
 *
 *
 *  window.location.origin  URL
 * - Better Auth  callbackURL allowRelativePaths
 *    trustedOrigins  "Invalid callbackURL"
 * -  API  Bun  Vite
 *    origin
 * -  Origin/Host
 */
export function getDefaultGameRedirectUrl(): string {
  return '/game';
}

export function toAuthActionError(error: unknown): AuthActionError | null {
  if (!error) {
    return null;
  }

  if (error instanceof BetterFetchError) {
    return {
      code:
        typeof error.error?.code === 'string' ? error.error.code : undefined,
      message:
        typeof error.error?.message === 'string'
          ? error.error.message
          : error.message,
      originalMessage:
        typeof error.error?.originalMessage === 'string'
          ? error.error.originalMessage
          : undefined,
      status: error.status,
      statusText: error.statusText,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return {
      code:
        'code' in error && typeof error.code === 'string'
          ? error.code
          : undefined,
      message: error.message,
      originalMessage:
        'originalMessage' in error && typeof error.originalMessage === 'string'
          ? error.originalMessage
          : undefined,
      status:
        'status' in error && typeof error.status === 'number'
          ? error.status
          : undefined,
      statusText:
        'statusText' in error && typeof error.statusText === 'string'
          ? error.statusText
          : undefined,
    };
  }

  return {
    message: '认证请求失败，请稍后重试',
  };
}
