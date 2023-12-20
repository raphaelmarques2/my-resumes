import { useStore } from "@nanostores/react";
import { sharedEducations } from "../../stores/sharedEducations";
import {
  type Education,
  formatEducation,
} from "../../services/types/Education";
import { sharedResume } from "../../stores/sharedResume";

export function EducationPdfPreview({ fromResume }: { fromResume?: boolean }) {
  const educations = useStore(sharedEducations.store);
  const resume = useStore(sharedResume.store);

  if (fromResume && !resume) return null;

  function getEducationList(): Education[] {
    if (!fromResume) return educations;
    if (!resume) return [];

    return resume.educations
      .map((id) => educations.find((x) => x.id === id)!)
      .filter(Boolean);
  }

  const educationsList = getEducationList();

  return (
    <div className="pdf">
      <div className="section-title">Education</div>
      <ul className="list-disc list-inside">
        {educationsList.map((education) => (
          <li key={education.id}>{formatEducation(education)}</li>
        ))}
      </ul>
    </div>
  );
}
