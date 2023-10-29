import { LoginDto, SignupDto, UserDto } from "~/services/backend/generated";
import { wait } from "~/services/utils";
import { useBackend } from "./useBackend";

export function useAuth() {
  const backend = useBackend();

  const cookie = useCookie<string | null>("AUTH_TOKEN");

  const state = useState<{ user: UserDto | null; token: string | null }>(
    "auth",
    () => ({ user: null, token: null })
  );

  const isLoggedIn = computed(() => Boolean(state.value.user));

  function setToken(token: string | null) {
    state.value.token = token;
    cookie.value = token;
    backend.setToken(token);
  }

  async function signup(payload: SignupDto) {
    await wait(1000);
    try {
      const response = await backend.api.auth.signup(payload);
      state.value.user = response.user;
      setToken(response.token);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function login(payload: LoginDto) {
    await wait(1000);
    try {
      const response = await backend.api.auth.login(payload);
      state.value.user = response.user;
      setToken(response.token);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function logout() {
    state.value.user = null;
    setToken(null);
    if (window) {
      window.location.reload();
    }
  }

  async function validateToken() {
    if (!cookie.value) return;

    setToken(cookie.value);
    try {
      const response = await backend.api.auth.authenticate();
      state.value.user = response.user;
      setToken(response.token);
    } catch (error) {
      setToken(null);
    }
  }

  return {
    state: readonly(state.value),
    isLoggedIn,
    signup,
    login,
    logout,
    validateToken,
  };
}
