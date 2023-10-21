import { BackendClient } from "~/services/backend/generated";

const client = new BackendClient({
  BASE: "http://localhost:3001",
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
