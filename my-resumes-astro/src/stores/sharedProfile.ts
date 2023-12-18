import { atom } from "nanostores";
import type { Profile } from "../services/types/Profile";

export const store = atom<Profile | null>(null);

function update(data: Partial<Profile>) {
  const profile = store.get();
  if (profile) {
    store.set({ ...profile, ...data });
  }
}

export const sharedProfile = {
  store,
  update,
} as const;
