// eslint.config.js
import process from 'node:process';
import antfu from '@antfu/eslint-config';

export default await antfu(
  {
    stylistic: {
      indent: 2,
    },
  },

  /**
   * Override for vue-mobile (Ionic Vue app)
   */
  {
    files: ['vue-mobile/**/*.{vue,js,ts}'],
    rules: {
      'vue/eqeqeq': ['warn', 'smart'],
      'vue/custom-event-name-casing': ['warn'],
      'vue/no-deprecated-slot-attribute': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { ignores: ['/^ion-/'] }],
      'vue/v-on-event-hyphenation': ['warn', 'always', {
        autofix: false,
        ignore: ['/^ion/', 'ionChange', 'ionInput', 'didDismiss'],
      }],
      'node/prefer-global/process': 'off',
    },
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'style/indent': ['error', 2],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'style/semi': ['error', 'always'],
    },
  },
);
