import { atom } from "nanostores";
import type { Experience } from "../services/types/Experience";

const store = atom<Experience[]>([]);

export function update(id: string, data: Partial<Experience>) {
  const experiences = store.get();

  const updated = experiences.map((experience) => {
    if (experience.id === id) {
      return { ...experience, ...data };
    }
    return experience;
  });

  store.set(updated);
}

export const sharedExperiences = {
  store,
  update,
} as const;
