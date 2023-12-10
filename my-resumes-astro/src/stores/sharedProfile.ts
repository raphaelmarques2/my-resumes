import { atom } from "nanostores";
import type { Profile } from "../services/types/Profile";

export const sharedProfile = atom<Profile | null>(null);
