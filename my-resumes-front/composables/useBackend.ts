import { BackendClient } from "~/services/backend/generated";

let client: BackendClient;

export function useBackend() {
  const runtimeConfig = useRuntimeConfig();
  console.log("runtimeConfig", runtimeConfig.public);

  if (!client) {
    client = new BackendClient({
      BASE: runtimeConfig.public.NUXT_BACKEND_URL as string,
    });
  }

  function setToken(newToken: string | null) {
    client.request.config.TOKEN = newToken || undefined;
  }

  return {
    api: client,
    setToken,
  };
}
