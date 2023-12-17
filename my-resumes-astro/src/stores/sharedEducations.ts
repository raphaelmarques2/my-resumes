import { atom } from "nanostores";
import type { Education } from "../services/types/Education";

export const sharedEducations = atom<Education[]>([]);
