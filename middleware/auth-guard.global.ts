export default defineNuxtRouteMiddleware(async (to) => {
  const { refreshIfExpired } = useToken()

  if (to.meta.isPublic) return true

  await refreshIfExpired()

  return true
})