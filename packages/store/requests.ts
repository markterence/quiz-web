import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';

/**
 * This store is used to keep track of requests that are currently in progress.
 */
export const useRequestsStore = defineStore('requestsStore', {
  state: () => ({
    queue: [] as string[],
  }),

  getters: {
    queueHasItems(): boolean {
      return this.queue.length > 0;
    },
  },

  actions: {

    /**
     * Add a request to the queue. Unique ID is generated and returned.
     *
     * Requests added on queue are removed after 3.5 seconds (Assuming they either crashed or never finished)
     */
    startRequest() {
      const id = nanoid();
      this.queue = [...this.queue, id];

      // If requests take more than 3.5 seconds, we'll have to assume they'll either never
      // happen, or already crashed
      setTimeout(() => this.endRequest(id), 3500);

      return id;
    },

    endRequest(id: string) {
      console.debug('[@shared/store][requests]: endRequest', id);
      this.queue = this.queue.filter((queueID: string) => queueID !== id);
    },
  },
});
