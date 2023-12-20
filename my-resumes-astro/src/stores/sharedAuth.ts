import { atom } from "nanostores";
import type { User } from "../services/types/User";

export const store = atom({
  token: null as string | null,
  isAuthenticated: false as boolean,
  user: null as User | null,
});

function login(token: string, user: User) {
  console.log("sharedAuth.login()");
  store.set({
    token,
    isAuthenticated: true,
    user,
  });
}
function logout() {
  console.log("sharedAuth.logout()");
  store.set({
    token: null,
    isAuthenticated: false,
    user: null,
  });
}

export const sharedAuth = {
  store,
  login,
  logout,
} as const;
