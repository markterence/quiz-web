import { defineStore } from 'pinia';
import { FILE_LIMIT, MAX_FILE_SIZE } from '@/constants/constants';

export const useInstanceConfigStore = defineStore('instanceConfigStore', () => {
  // https://stackoverflow.com/a/65262638
  const config = ref({
    maxFileSize: MAX_FILE_SIZE,
    fileLimit: FILE_LIMIT,
  });

  /**
   * Load the instance configuration from the server.
   */
  async function load() {
    // Write function to properly resolve each of the config values, it's better than lazily assigned values
    // That way, we can also handle the case where the config is not available
    config.value.maxFileSize = MAX_FILE_SIZE;
    config.value.fileLimit = FILE_LIMIT;
  }

  return {
    config,
    load,
  };
});
