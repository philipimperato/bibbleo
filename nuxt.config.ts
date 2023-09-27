export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@formkit/nuxt',
    '@pinia/nuxt',
    'nuxt-feathers-pinia',
    '@nuxt/ui'
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
