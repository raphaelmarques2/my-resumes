import { useStore } from "@nanostores/react";
import moment from "moment";
import { sharedExperiences } from "../../stores/sharedExperiences";
import type { Experience } from "../../services/types/Experience";
import { sharedResume } from "../../stores/sharedResume";

export function ExperiencePdfPreview({ fromResume }: { fromResume?: boolean }) {
  const experiences = useStore(sharedExperiences);
  const resume = useStore(sharedResume);

  if (fromResume && !resume) return null;

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

  function getExperienceList(): Experience[] {
    if (!fromResume) return experiences;
    if (!resume) return [];

    return resume.experiences
      .map((id) => experiences.find((x) => x.id === id)!)
      .filter(Boolean);
  }

  const experiencesList = getExperienceList();

  return (
    <div className="pdf">
      <div className="section-title">Experiences</div>
      {experiencesList.map((experience) => (
        <>
          <div className="section-subtitle">{experience.title}</div>
          <div className="section-item">{formatExperience(experience)}</div>
          <div className="section-item">{experience.description}</div>
        </>
      ))}
    </div>
  );
}
