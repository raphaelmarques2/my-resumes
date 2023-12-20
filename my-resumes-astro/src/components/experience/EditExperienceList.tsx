import { useStore } from "@nanostores/react";
import { useState, type FormEvent } from "react";
import type { Experience } from "../../services/types/Experience";
import { sharedBackend } from "../../stores/sharedBackend";
import { sharedExperiences } from "../../stores/sharedExperiences";
import { sharedResume } from "../../stores/sharedResume";
import { FormSubmit } from "../common/FormSubmit";
import { ListItem } from "../common/ListItem";
import { AddExperienceButton } from "./AddExperienceButton";

export function EditExperienceList({ resumeId }: { resumeId: string }) {
  const experiences = useStore(sharedExperiences.store);
  const resume = useStore(sharedResume.store);

  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sharedBackend()
      .updateResume(resume!)
      .catch((err) => {
        setError(err.message ?? "Error");
        throw err;
      });
    window.location.href = `/resumes/${resumeId}/review`;
  }

  function enableExperience(experience: Experience, include: boolean) {
    if (!resume) return;

    const experiences = [...resume.experiences];

    if (include && !resume.experiences.includes(experience.id)) {
      experiences.push(experience.id);
    } else if (!include && resume.experiences.includes(experience.id)) {
      const index = experiences.indexOf(experience.id);
      experiences.splice(index, 1);
    }

    sharedResume.update({ ...resume, experiences: experiences });
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <div className="space-y-2">
        {experiences.map((experience, i) => (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={resume?.experiences.includes(experience.id)}
              className="form-checkbox"
              onChange={(x) => enableExperience(experience, x.target.checked)}
            />
            <ListItem
              href={`/resumes/${resumeId}/experiences/${experience.id}`}
              title={experience.title}
              subtitle={experience.company}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4 space-y-2">
        <AddExperienceButton resumeId={resumeId} />
        <FormSubmit error={error} />
      </div>
    </form>
  );
}
