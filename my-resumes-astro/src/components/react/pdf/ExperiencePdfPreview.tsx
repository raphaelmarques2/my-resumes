import { useStore } from "@nanostores/react";
import moment from "moment";
import type { Education } from "../../../services/types/Education";
import { sharedExperiences } from "../../../stores/sharedExperiences";
import type { Experience } from "../../../services/types/Experience";

export function ExperiencePdfPreview() {
  const experiences = useStore(sharedExperiences);

  function formatExperience(experience: Experience): string {
    return [
      experience.company,
      experience.startDate
        ? moment(experience.startDate).format("MMM YYYY")
        : "",
      experience.endDate
        ? moment(experience.endDate).format("MMM YYYY")
        : "Now",
    ]
      .filter(Boolean)
      .join(" - ");
  }

  return (
    <div className="pdf">
      <div className="section-title">Experiences</div>
      {experiences.map((experience) => (
        <>
          <div className="section-subtitle">{experience.title}</div>
          <div className="section-item">{formatExperience(experience)}</div>
          <div className="section-item">{experience.description}</div>
        </>
      ))}
    </div>
  );
}
