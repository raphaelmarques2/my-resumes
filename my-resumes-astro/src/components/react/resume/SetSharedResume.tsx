import { useEffect } from "react";
import type { Resume } from "../../../services/types/Resume";
import { sharedResume } from "../../../stores/sharedResume";

export function SetSharedResume({ resume }: { resume: Resume }) {
  useEffect(() => {
    sharedResume.set(resume);
  }, []);
  return null;
}
