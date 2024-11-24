import type { MessagePassThroughOptions } from 'primevue/message';

/**
 * PassTrough for PrimeVue Message
 * https://primevue.org/message/
 */

const pageBanner: MessagePassThroughOptions = {
  root: {
    class: 'm-0 rounded-0',
  },
  wrapper: {
    class: 'p-3',
  },
};
const messagePassthrough: { [k: string]: MessagePassThroughOptions } = {
  pageBanner,
  pageBannerDanger: {
    root: {
      class: 'border-b border-b-opacity-40 border-b-red-500',
    },
  },
};

export default messagePassthrough;
