import { useStore } from "@nanostores/react";
import { sharedExperiences } from "../../stores/sharedExperiences";
import type { Experience } from "../../services/types/Experience";
import { ListItem } from "../common/ListItem";
import { AddExperienceButton } from "./AddExperienceButton";
import { FormSubmit } from "../common/FormSubmit";
import { useState, type FormEvent } from "react";
import { sharedResume } from "../../stores/sharedResume";
import { backend } from "../../services/backend";

export function EditExperienceList({ resumeId }: { resumeId: string }) {
  const experiences = useStore(sharedExperiences);
  const resume = useStore(sharedResume);

  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await backend.updateResume(sharedResume.get()!).catch((err) => {
      setError(err.message ?? "Error");
      throw err;
    });
    window.location.href = `/resumes/${resumeId}/review`;
  }

  function enableExperience(experience: Experience, enabled: boolean) {
    if (!resume) return;

    const experiences = [...resume.experiences];

    if (resume.experiences.includes(experience.id)) {
      const index = experiences.indexOf(experience.id);
      experiences.splice(index, 1);
    } else {
      experiences.push(experience.id);
    }

    sharedResume.set({ ...resume, experiences: experiences });
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
