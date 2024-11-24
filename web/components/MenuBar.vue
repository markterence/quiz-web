<script setup>
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

definePageMeta({
  layout: false,
});

const toast = useToast();

const MenuItems = ref([
  { label: 'Home', command: () => navigateTo('/home') },
]);
</script>

<template>
  <div>
    <Menubar
      :model="MenuItems" :pt="{
        root: {
          class: 'rounded-none border-0 border-b-1',
        },
      }"
    />
  </div>
</template>
