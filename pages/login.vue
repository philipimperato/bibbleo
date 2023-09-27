<script setup lang="ts">
import { FormKitMessages } from '@formkit/vue'
definePageMeta({ isPublic: true })

const route = useRoute();
const router = useRouter();
const api = useRequest();
const { setTokens } = useToken()

const { add } = useNotification()
const { mutateAsync: authorize } = api.service('auth').create()

if (route.query.m) {
  add(route.query.m as string, 'Error')
  router.replace({ query: {} })
}

const login = async (loginData: any) => {
  const response = await authorize(loginData)

  if (response.error) {
    add(response.message, 'Error')
  } else {
    setTokens([response.accessToken, response.refreshToken])
    await navigateTo('/list')
  }
}
</script>

<template>
  <div class="h-screen overflow-hidden bg-gray-900">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormKit
          form-class="space-y-6"
          type="form"
          @submit="login"
          submit-label="Login"
          :submit-attrs="{
            inputClass: 'btn btn-base btn-indigo'
          }"
        >
          <FormKitMessages class="hidden" />
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-white">Email</label>
            <div class="mt-2">
              <TextField validation="required|email" name="email" />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-white">Password</label>
            <div class="mt-2">
              <TextField validation="required" name="password" />
            </div>
          </div>
        </FormKit>

        <p class="mt-10 text-center text-sm text-gray-400">
          Not a member?
          {{ ' ' }}
          <a href="#" class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>
