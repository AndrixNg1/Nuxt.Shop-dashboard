// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode'],
  css: ['~/assets/css/main.css', '~/assets/css/theme.css'],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  app: {
    head: {
      title: 'Storeflow — Dashboard',
      meta: [{ name: 'description', content: 'Dashboard de gestion de votre boutique.' }]
    }
  },
  typescript: { strict: true }
})
