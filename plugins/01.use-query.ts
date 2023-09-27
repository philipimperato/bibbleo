import restClient from '~/rest-client/rest-client'
import {
  VueQueryPlugin,
  QueryClient,
  VueQueryPluginOptions,
} from '@tanstack/vue-query'

export default defineNuxtPlugin(nuxt => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
  })
  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)
})