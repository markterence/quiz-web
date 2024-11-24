<!-- eslint-disable no-console -->
<script setup lang="ts">
definePageMeta({
  layout: false,
});

onMounted(async () => {
  console.debug('mounted');
  await navigateTo('/home', { redirectCode: 302 });
});
</script>

<template>
  <div>
    <NuxtLayout name="main-menu-bar-layout">
      <!--  -->
    </NuxtLayout>
  </div>
</template>
