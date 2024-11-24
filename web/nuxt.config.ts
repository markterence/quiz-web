// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      purchasingApiBaseUrl: 'http://127.0.0.1:1337',
    },
  },

  modules: [
    '@nuxt/image',
    'nuxt-primevue',
    '@unocss/nuxt',
    '@pinia/nuxt',
    ['radix-vue/nuxt', {
      prefix: 'Radix',
    }],
  ],

  ssr: false,

  // dir: {
  //   assets: 'src/assets',
  //   layouts: 'src/layouts',
  //   middleware: 'src/middleware',
  //   modules: 'src/modules',
  //   pages: 'src/pages',
  //   plugins: 'src/plugins'
  // },

  css: [
    // '@unocss/reset/normalize.css',
    'primevue/resources/themes/aura-light-blue/theme.css',
    'primeicons/primeicons.css',
  ],

  /** https://primevue.org/nuxt/#configuration */
  primevue: {
    usePrimeVue: true,
    options: {},
    importPT: undefined,
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined,
    },
    directives: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined,
    },
    composables: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined,
    },
  },

  /**
   * Nuxt Image
   * https://image.nuxt.com/usage/use-image
   */
  image: {
    /**
     *
     * Use base-img-provider for image optimizer services that support query string.
     * Otherwise, create a custom provider or use built-in providers from nuxt/image.
     *
     * Example:
     *  - https://example.com/image.jpg?w=300&h=300
     */
    providers: {
      pexels: {
        name: 'pexels',
        provider: '~/providers/base-img-provider.ts',
        options: {
          baseURL: 'https://images.pexels.com',
        },
      },
    },
  },
});
