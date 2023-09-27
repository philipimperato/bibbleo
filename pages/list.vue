<script setup lang="ts">
const request = useRequest()
const { add } = useNotification()
const auth = useToken();
const query = {
  $limit: 10,
  $skip: 0
}
const users$ = request.service('users').find({ query })

const logout = async () => {
  await auth.logout()
  add('You have successfully logged out', 'Success')
  navigateTo('/login')
}

</script>

<template>
  <h1>Users, List:</h1>
  <h1 v-if="users$.isFetched">Always: {{ users$.data }}</h1>
  <UButton @click="logout()">Logout</UButton>
</template>