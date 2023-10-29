import { BackendClient } from "~/services/backend/generated";

let client: BackendClient;

export function useBackend() {
  const runtimeConfig = useRuntimeConfig();

  if (!client) {
    client = new BackendClient({
      BASE: runtimeConfig.public.BACKEND_URL as string,
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
