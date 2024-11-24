import registerFontAwesome from './fontawesome/fontawesome'

export default defineNuxtPlugin((nuxtApp) => {
  registerFontAwesome(nuxtApp.vueApp)
})
