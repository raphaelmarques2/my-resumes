import { useEffect } from "react";
import type { Experience } from "../../services/types/Experience";
import { sharedExperiences } from "../../stores/sharedExperiences";

export function SetSharedExperiences({
  experiences,
}: {
  experiences: Experience[];
}) {
  useEffect(() => {
    sharedExperiences.store.set(experiences);
  }, []);
  return null;
}
