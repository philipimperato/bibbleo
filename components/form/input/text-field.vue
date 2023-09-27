<template>
  <FormKit
    :classes="{
      input: 'block w-full rounded-md border-0 bg-white/5 py-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6',
      message: 'pl-1 text-sm text-red-400'
    }"
    type="text"
    v-bind="$attrs"
  />
</template>