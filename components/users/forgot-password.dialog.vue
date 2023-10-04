<script setup lang="ts">
const props = defineProps(['isOpen'])
const emit = defineEmits()

const reset = () => {
  console.log('reset')
  emit('close')
}
</script>

<template>
<div>
  <UModal v-model="props.isOpen">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <div>Reset Password</div>
          <button
            @click="emit('close')"
            type="button" class="rounded-full p-2 text-white shadow-sm hover:bg-gray-800">
            <Icon class="w-6 h-6 pb-0.5" name="i-heroicons-x-mark"></Icon>
          </button>
        </div>
      </template>

      <FormKit
        form-class="space-y-6"
        type="form"
        @submit="reset"
        :actions="false"
        :incomplete-message="false"
      >
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white mb-2">Email</label>
          <TextField validation="required|email" name="email" />
        </div>
      </FormKit>

      <template #footer>
        <div class="flex justify-end">
          <UButton color="white">
            Send Reset Link
          </UButton>
          <UButton color="indigo">
            Send Reset Link
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</div>
</template>