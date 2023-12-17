import { useStore } from "@nanostores/react";
import { sharedEducations } from "../../../stores/sharedEducations";
import type { Education } from "../../../services/types/Education";
import moment from "moment";

export function EducationPdfPreview() {
  const educations = useStore(sharedEducations);

  function formatEducation(education: Education): string {
    return [
      education.title,
      education.institution,
      education.endDate ? moment(education.endDate).format("MMM YYYY") : "Now",
    ]
      .filter(Boolean)
      .join(" - ");
  }

  return (
    <div className="pdf">
      <div className="section-title">Education</div>
      <ul className="list-disc list-inside">
        {educations.map((education) => (
          <li>{formatEducation(education)}</li>
        ))}
      </ul>
    </div>
  );
}
