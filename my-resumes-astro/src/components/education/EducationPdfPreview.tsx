import { useStore } from "@nanostores/react";
import { sharedEducations } from "../../stores/sharedEducations";
import type { Education } from "../../services/types/Education";
import moment from "moment";
import { sharedResume } from "../../stores/sharedResume";

export function EducationPdfPreview({ fromResume }: { fromResume?: boolean }) {
  const educations = useStore(sharedEducations);
  const resume = useStore(sharedResume.store);

  if (fromResume && !resume) return null;

  function formatEducation(education: Education): string {
    return [
      education.title,
      education.institution,
      education.endDate ? moment(education.endDate).format("MMM YYYY") : "Now",
    ]
      .filter(Boolean)
      .join(" - ");
  }

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
          <li>{formatEducation(education)}</li>
        ))}
      </ul>
    </div>
  );
}
