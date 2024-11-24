/**
 * This file handles authentication function for web and is specific only to Nuxt.
 * If there's a need to use this pattern on the mobile app, we need to duplicate this file
 * and remove the Nuxt specific code, and replace with with the mobile specific code.
 *
 * Logic is still the same, but the implementation might be different.
 */

/* eslint-disable ts/consistent-type-definitions */
import { useLocalStorage } from '@vueuse/core';
import api from '@/api/main';
import { useUserStore } from '@/store/user';
import { DEFAULT_AUTH_PROVIDER, LocalStorageKeys } from '@/constants/constants';

type LoginCredentials = {
  email?: string
  username?: string
  password?: string
};

type LoginParams = {
  credentials: LoginCredentials
  provider?: string
};

export enum LogoutReason {
  SIGN_OUT = 'SIGN_OUT',
  /**
   * Synonymous with TOKEN_EXPIRED
   */
  SESSION_EXPIRED = 'SESSION_EXPIRED',

  SERVER_CONNECTION_ERROR = 'SERVER_CONNECTION_ERROR',
}

export type LogoutOptions = {
  /**
   * Whether to allow navigation on somewhere after logout
   */
  navigate?: boolean
  reason?: LogoutReason
};

export async function login({ credentials }: LoginParams): Promise<void> {
  const userStore = useUserStore();

  const response = await api.auth.login({ ...credentials, username: credentials.email! });

  const accessToken = response.data.token;

  // Add the header to the API handler for every request
  // eslint-disable-next-line dot-notation
  api.httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  userStore.authenticated = true;
  userStore.currentUser = response.data;

  saveAuthResult({ token: accessToken, user: response.data });
}

export async function verifyToken(): Promise<void> {
  const response = await api.auth.session();

  const userStore = useUserStore();

  if (userStore.currentUser === null)
    userStore.currentUser = response.data;
}

/**
 * Logout handler when user manually signs out or when the token is expired
 */
export async function logout(logoutOptions: LogoutOptions = {}): Promise<void> {
  console.debug('logout', logoutOptions);
  const userStore = useUserStore();

  const defaultLogoutOptions = {
    navigate: true,
    reason: LogoutReason.SIGN_OUT,
  };

  // eslint-disable-next-line dot-notation
  delete api.httpClient.defaults.headers.common['Authorization'];

  const options = { ...defaultLogoutOptions, ...logoutOptions };

  // When user manually signed out. Use the Logout endpoint.
  if (options.reason === LogoutReason.SIGN_OUT) {
    try {
      // TODO: No logout endpoint yet
      // await api.post(`/auth/logout`);

      // Remove the token from the local storage.
      const tokenResult = useLocalStorage(LocalStorageKeys.token, '');
      tokenResult.value = null;
    }
    catch {
      // User already signed out
    }
  }

  // Remove the user from the store
  userStore.authenticated = true;
  userStore.currentUser = null;

  if (options.navigate === true) {
    console.debug('logout navigate');
    const router = useRouter();

    router.push({
      path: `/login`,
      query: { reason: options.reason },
    });
  }
}

/**
 * Store auth result on local storage including the token
 */
export function saveAuthResult({ token, user }: { token: string, user: any }): void {
  const tokenResult = useLocalStorage(LocalStorageKeys.token, token);
  tokenResult.value = token;
  const userResult = useLocalStorage(LocalStorageKeys.user, {});
  userResult.value = user;
}
