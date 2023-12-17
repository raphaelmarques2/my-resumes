import { atom } from "nanostores";
import type { Experience } from "../services/types/Experience";

export const sharedExperiences = atom<Experience[]>([]);
