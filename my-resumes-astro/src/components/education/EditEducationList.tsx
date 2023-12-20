import { useStore } from "@nanostores/react";
import { useState, type FormEvent } from "react";
import { Backend } from "../../services/backend";
import type { Education } from "../../services/types/Education";
import { sharedEducations } from "../../stores/sharedEducations";
import { sharedResume } from "../../stores/sharedResume";
import { FormSubmit } from "../common/FormSubmit";
import { ListItem } from "../common/ListItem";
import { AddEducationButton } from "./AddEducationButton";
import { sharedBackend } from "../../stores/sharedBackend";

export function EditEducationList({ resumeId }: { resumeId: string }) {
  const educations = useStore(sharedEducations.store);
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
    window.location.href = `/resumes/${resumeId}/experiences`;
  }

  function enableEducation(education: Education, include: boolean) {
    if (!resume) return;

    const educations = [...resume.educations];

    if (include && !resume.educations.includes(education.id)) {
      educations.push(education.id);
    } else if (!include && resume.educations.includes(education.id)) {
      const index = educations.indexOf(education.id);
      educations.splice(index, 1);
    }

    sharedResume.update({ educations: educations });
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <div className="space-y-2">
        {educations.map((education) => (
          <div className="flex items-center space-x-2" key={education.id}>
            <input
              type="checkbox"
              checked={resume?.educations.includes(education.id)}
              className="form-checkbox"
              onChange={(x) => enableEducation(education, x.target.checked)}
            />
            <ListItem
              href={`/resumes/${resumeId}/educations/${education.id}`}
              title={education.title}
              subtitle={education.institution}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4 space-y-2">
        <AddEducationButton resumeId={resumeId} />
        <FormSubmit error={error} />
      </div>
    </form>
  );
}
