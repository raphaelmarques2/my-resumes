import { BackendClient } from "~/services/backend/generated";

let client: BackendClient;

export function useBackend() {
  const runtimeConfig = useRuntimeConfig();
  console.log("env", runtimeConfig.public);

  if (!client) {
    client = new BackendClient({
      BASE: runtimeConfig.public.backendUrl as string,
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
