import { atom } from "nanostores";
import type { Resume } from "../services/types/Resume";

export const sharedResume = atom<Resume | null>(null);
