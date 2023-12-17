import { useStore } from "@nanostores/react";
import { useState, type FormEvent } from "react";
import { backend } from "../../../services/backend";
import { sharedEducations } from "../../../stores/sharedEducations";
import { TextInput } from "../TextInput";

export function EditEducation(props: { resumeId: string }) {
  const [error, setError] = useState("");

  const educations = useStore(sharedEducations);
  if (!educations.length) return null;
  const education = educations[0];

  function redirectToEducation() {
    window.location.href = `/resumes/${props.resumeId}/educations`;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await backend.updateEducation(sharedEducations.get()[0]).catch((err) => {
      setError(err.message ?? "Error");
      throw err;
    });
    redirectToEducation();
  }

  async function cancel() {
    redirectToEducation();
  }

  async function deleteEducation() {
    await backend.deleteEducation(education.id);
    redirectToEducation();
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <TextInput
        label="Title"
        value={education.title}
        required
        placeholder="Title"
        onInput={(value) =>
          sharedEducations.set([{ ...education, title: value }])
        }
      />
      <TextInput
        label="Institution"
        value={education.institution}
        required
        placeholder="Title"
        onInput={(value) =>
          sharedEducations.set([{ ...education, institution: value }])
        }
      />
      <TextInput
        label="Start date"
        value={education.startDate}
        type="date"
        onInput={(value) =>
          sharedEducations.set([{ ...education, startDate: value }])
        }
      />
      <TextInput
        label="End date"
        value={education.endDate}
        type="date"
        onInput={(value) =>
          sharedEducations.set([{ ...education, endDate: value }])
        }
      />
      <div className="flex flex-col items-center space-y-2 mt-4">
        <button className="btn btn-primary btn-wide" type="submit">
          Save
        </button>
        <button className="btn btn-ghost btn-wide" onClick={() => cancel()}>
          Cancel
        </button>
        <button
          className="btn btn-ghost btn-wide"
          onClick={() => deleteEducation()}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
