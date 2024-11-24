import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    /**
     * Fields:
     * avatar,
     * email,
     * id,
     * name,
     * username,
     */
    currentUser: null,

    /** Is the current user authenticated. */
    authenticated: false,
  }),
});
