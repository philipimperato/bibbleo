export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@formkit/nuxt',
    'nuxt-feathers-pinia',
    '@nuxt/ui',
    'nuxt-icon'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  typescript: {
    shim: false,
  },
  ssr: false,
  tailwindcss: {
    config: {
      plugins: [
        require('@tailwindcss/forms'),
      ]
    }
  },
  runtimeConfig: {
    app: {
      API_URL: process.env.API_URL
    }
  }
})
