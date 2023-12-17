import { useStore } from "@nanostores/react";
import { useState, type FormEvent } from "react";
import { backend } from "../../../services/backend";
import { sharedResume } from "../../../stores/sharedResume";
import { FormSubmit } from "../FormSubmit";
import { TextInput } from "../TextInput";

export function EditResume(props: { resumeId: string }) {
  const [error, setError] = useState("");

  const resume = useStore(sharedResume);
  if (!resume) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await backend.updateResume(sharedResume.get()!).catch((err) => {
      setError(err.message ?? "Error");
      throw err;
    });
    window.location.href = `/resumes/${props.resumeId}/profile`;
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <TextInput
        label="Title"
        value={resume.title}
        name="title"
        required
        placeholder="Title"
        onInput={(value) => sharedResume.set({ ...resume, title: value })}
      />

      <TextInput
        label="Description"
        value={resume.description}
        name="description"
        placeholder="Description"
        area={true}
        onInput={(value) => sharedResume.set({ ...resume, description: value })}
      />

      <FormSubmit error={error} />
    </form>
  );
}
