import { defineStore } from 'pinia';

export const useAuthStore = defineStore('shared-auth', {
  actions: {
    /**
     * Order cart js comment
     */
    orderCart() {
      console.debug('this is from shared package:store');
    },
  },
});
