<script lang="ts" setup>
import Message from 'primevue/message';

import { usePassThrough } from 'primevue/passthrough';
import messagePassthrough from '@/passthrough/message';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const error = computed(() => appStore.error);

const pageBannerPassthrough = usePassThrough(messagePassthrough.pageBanner, messagePassthrough.pageBannerDanger, {
  mergeSections: true,
  mergeProps: true,
});

// const error = ref<Error>();
// onErrorCaptured((err) => {
//   error.value = err;
//   console.log('errorCaptured', err);
//   return false;
// });
</script>

<template>
  <NuxtLayout>
    <Message v-if="error" severity="error" :pt="pageBannerPassthrough">
      <div>
        {{ error?.message || 'CONNECTION_TIMEOUT' }}: {{ error?.status || 0 }}
      </div>
    </Message>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
    font-size: 14px;
}

body {
  margin: 0;
  padding: 0;
}

:root {
    --primary-50: 236 253 245;
    --primary-100: 209 250 229;
    --primary-200: 167 243 208;
    --primary-300: 110 231 183;
    --primary-400: 52 211 153;
    --primary-500: 16 185 129;
    --primary-600: 5 150 105;
    --primary-700: 4 120 87;
    --primary-800: 6 95 70;
    --primary-900: 4 78 56;
    --primary-950: 2 44 34;
    --surface-0: 255 255 255;
    --surface-50: 248 250 252;
    --surface-100: 241 245 249;
    --surface-200: 226 232 240;
    --surface-300: 203 213 225;
    --surface-400: 148 163 184;
    --surface-500: 100 116 139;
    --surface-600: 71 85 105;
    --surface-700: 45 55 72;
    --surface-800: 30 41 59;
    --surface-900: 15 23 42;
    --surface-950: 3 6 23;
}
</style>
