import { atom } from "nanostores";
import type { Resume } from "../services/types/Resume";

const store = atom<Resume | null>(null);

function update(data: Partial<Resume>) {
  if (store.get()) {
    store.set({ ...store.get()!, ...data });
  }
}

export const sharedResume = {
  store,
  update,
};
