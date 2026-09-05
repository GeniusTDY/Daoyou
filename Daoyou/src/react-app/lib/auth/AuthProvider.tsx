import type { ReactNode } from 'react';
import {
  AuthContext,
  daohaoToAuthEmail,
  getDefaultGameRedirectUrl,
  toAuthActionError,
  type AuthContextType,
} from './authState';
import { authClient } from './client';

export function AuthProvider({ children }: { children: ReactNode }) {
  const sessionState = authClient.useSession();
  const session = sessionState.data?.session ?? null;
  const user = sessionState.data?.user ?? null;

  const syncSessionState = async () => {
    await sessionState.refetch();
  };

  const signUpWithPassword: AuthContextType['signUpWithPassword'] = async (
    daohao,
    password,
  ) => {
    const { error } = await authClient.signUp.email({
      name: daohao.trim(),
      email: daohaoToAuthEmail(daohao),
      password,
      callbackURL: getDefaultGameRedirectUrl(),
    });

    if (!error) {
      await syncSessionState();
    }

    return {
      error: toAuthActionError(error),
    };
  };

  const signInWithPassword: AuthContextType['signInWithPassword'] = async (
    daohao,
    password,
  ) => {
    const { error } = await authClient.signIn.email({
      email: daohaoToAuthEmail(daohao),
      password,
      callbackURL: getDefaultGameRedirectUrl(),
    });

    if (!error) {
      await syncSessionState();
    }

    return {
      error: toAuthActionError(error),
    };
  };

  const signOut: AuthContextType['signOut'] = async () => {
    const { error } = await authClient.signOut();

    if (!error) {
      await syncSessionState();
    }

    return {
      error: toAuthActionError(error),
    };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading: sessionState.isPending,
        signUpWithPassword,
        signInWithPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}