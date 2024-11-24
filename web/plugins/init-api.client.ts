/* eslint-disable dot-notation */

import { useLocalStorage } from '@vueuse/core';
import MainHttpClient from '@/api/main/http-client';
import { LocalStorageKeys } from '~/constants/constants';

export default defineNuxtPlugin(() => {
  console.debug('init-api.client.ts');

  const config = useRuntimeConfig();

  MainHttpClient.defaults.baseURL = config.public.purchasingApiBaseUrl;

  // Initialize the token from local storage, Read the token that was saved in the local storage
  const localToken = useLocalStorage(LocalStorageKeys.token, '');
  MainHttpClient.defaults.headers.common['Authorization'] = `Bearer ${localToken.value}`;
});
