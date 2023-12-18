import { useEffect } from "react";
import { sharedProfile } from "../../stores/sharedProfile";
import type { Profile } from "../../services/types/Profile";

export function SetSharedProfile({ profile }: { profile: Profile }) {
  useEffect(() => {
    sharedProfile.store.set(profile);
  }, []);
  return null;
}
