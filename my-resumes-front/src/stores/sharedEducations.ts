import { atom } from "nanostores";
import type { Education } from "../services/types/Education";

export const store = atom<Education[]>([]);

export function update(id: string, data: Partial<Education>) {
  const educations = store.get();

  const updated = educations.map((education) => {
    if (education.id === id) {
      return { ...education, ...data };
    }
    return education;
  });

  store.set(updated);
}

export const sharedEducations = {
  store,
  update,
} as const;
