import { useStore } from "@nanostores/react";
import { sharedProfile } from "../../stores/sharedProfile";
import { sharedResume } from "../../stores/sharedResume";
import { sharedEducations } from "../../stores/sharedEducations";
import { formatEducation } from "../../services/types/Education";
import { sharedExperiences } from "../../stores/sharedExperiences";
import { formatExperience } from "../../services/types/Experience";

export type PreviewType = "resume" | "education" | "experience" | "all";

export function ResumePdfPreview({
  filterFromResume,
  previewType,
}: {
  filterFromResume?: boolean;
  previewType: PreviewType;
}) {
  const resume = useStore(sharedResume.store);
  const profile = useStore(sharedProfile.store);
  const educations = useStore(sharedEducations.store);
  const experiences = useStore(sharedExperiences.store);

  if (filterFromResume && !resume) return null;

  if (previewType === "resume" || previewType === "all") {
    if (!resume) return null;
    if (!profile) return null;
  }

  const Profile = () => {
    if (!(previewType === "resume" || previewType === "all")) return null;
    if (!profile) return;
    if (!resume) return;

    return (
      <>
        <div className="name">{profile.name}</div>
        <div className="title">{resume.title}</div>
        <div className="profile-item">{profile.address}</div>
        <div className="profile-item">
          E-mail: <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div className="profile-item">
          LinkedIn: <a href={profile.linkedin}>{profile.linkedin}</a>
        </div>
        <div className="line"></div>
        <div className="section-title">Profile</div>
        <div className="profile-description">{resume.description}</div>
      </>
    );
  };

  const Educations = () => {
    if (!(previewType === "education" || previewType === "all")) return null;
    if (filterFromResume && !resume) return null;

    const educationsList = filterFromResume
      ? resume!.educations
          .map((id) => educations.find((x) => x.id === id)!)
          .filter(Boolean)
      : educations;

    return (
      <>
        {previewType === "all" && <div className="line"></div>}
        <div className="section-title">Education</div>
        <ul className="list-disc list-inside">
          {educationsList.map((education) => (
            <li className="leading-4" key={education.id}>
              {formatEducation(education)}
            </li>
          ))}
        </ul>
      </>
    );
  };

  const Experiences = () => {
    if (!(previewType === "experience" || previewType === "all")) return null;
    if (filterFromResume && !resume) return null;

    const experiencesList = filterFromResume
      ? resume!.experiences
          .map((id) => experiences.find((x) => x.id === id)!)
          .filter(Boolean)
      : experiences;

    return (
      <>
        {previewType === "all" && <div className="line"></div>}
        <div className="section-title">Experiences</div>
        {experiencesList.map((experience) => (
          <>
            <div className="section-subtitle">{experience.title}</div>
            <div className="section-item">{formatExperience(experience)}</div>
            <div className="section-item leading-4">
              {experience.description}
            </div>
          </>
        ))}
      </>
    );
  };

  return (
    <div className="pdf relative">
      <Profile />
      <Educations />
      <Experiences />
    </div>
  );
}
