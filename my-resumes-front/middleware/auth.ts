export default defineNuxtRouteMiddleware((to) => {
  const cookie = useCookie<string | null>("AUTH_TOKEN");
  if (!cookie.value) {
    console.log("no cookie. redirecting to /");
    if (to.path !== "/") return navigateTo("/");
  }
  const backend = useBackend();
  backend.setToken(cookie.value);
  const result = backend.api.auth
    .authenticate()
    .then(() => true)
    .catch(() => false);
  if (!result) {
    console.log("invalid cookie. redirecting to /");
    cookie.value = null;
    if (to.path !== "/") return navigateTo("/");
  }
});
