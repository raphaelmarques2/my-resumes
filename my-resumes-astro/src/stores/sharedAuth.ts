import { atom } from "nanostores";
import type { User } from "../services/types/User";

export const store = atom({
  token: null as string | null,
  isAuthenticated: false as boolean,
  user: null as User | null,
});

function login(token: string, user: User) {
  store.set({
    token,
    isAuthenticated: true,
    user,
  });
}
function logout() {
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
