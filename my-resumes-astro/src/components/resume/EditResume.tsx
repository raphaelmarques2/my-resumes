import { useStore } from "@nanostores/react";
import { useState, type FormEvent } from "react";
import { backend } from "../../services/backend";
import { sharedResume } from "../../stores/sharedResume";
import { FormSubmit } from "../common/FormSubmit";
import { TextInput } from "../common/TextInput";

export function EditResume(props: { resumeId: string }) {
  const [error, setError] = useState("");

  const resume = useStore(sharedResume.store);
  if (!resume) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await backend.updateResume(resume!).catch((err) => {
      setError(err.message ?? "Error");
      throw err;
    });
    window.location.href = `/resumes/${props.resumeId}/profile`;
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <TextInput
        label="Name"
        name="name"
        value={resume.name}
        required
        placeholder="Name"
        onInput={(value) => sharedResume.update({ name: value })}
      />

      <TextInput
        label="Title"
        name="title"
        value={resume.title}
        required
        placeholder="Title"
        onInput={(value) => sharedResume.update({ title: value })}
      />

      <TextInput
        label="Description"
        name="description"
        value={resume.description}
        placeholder="Description"
        area={true}
        onInput={(value) => sharedResume.update({ description: value })}
      />

      <FormSubmit error={error} />
    </form>
  );
}
