import { computed } from "nanostores";
import { Backend } from "../services/backend";
import { sharedAuth } from "./sharedAuth";

export const store = computed(sharedAuth.store, (auth) => {
  console.log("create new backend: ", auth.token);
  return new Backend(auth.token);
});

export const sharedBackend = () => store.get();
