import { joinURL, stringifyQuery } from 'ufo';
import type { ProviderGetImage } from '@nuxt/image';

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL } = {},
) => {
  return {
    url: `${joinURL(baseURL, src)}?${stringifyQuery(modifiers)}`,
  };
};
