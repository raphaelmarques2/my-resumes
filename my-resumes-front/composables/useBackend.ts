import { BackendClient } from "~/services/backend/generated";

const client = new BackendClient({
  BASE: process.env.BACKEND_URL,
});

export function useBackend() {
  function setToken(newToken: string | null) {
    client.request.config.TOKEN = newToken || undefined;
  }

  return {
    api: client,
    setToken,
  };
}
