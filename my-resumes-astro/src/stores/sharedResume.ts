import { atom } from "nanostores";
import type { Resume } from "../services/types/Resume";

const store = atom<Resume | null>(null);

function update(data: Partial<Resume>) {
  const resume = store.get();
  if (resume) {
    store.set({ ...resume, ...data });
  }
}

export const sharedResume = {
  store,
  update,
} as const;
