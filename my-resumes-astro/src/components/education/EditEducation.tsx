import { useStore } from "@nanostores/react";
import { useState, type FormEvent } from "react";
import { sharedBackend } from "../../stores/sharedBackend";
import { sharedEducations } from "../../stores/sharedEducations";
import { TextInput } from "../common/TextInput";
import { DateInput } from "../common/DateInput";
import moment from "moment";

export function EditEducation(props: { resumeId: string }) {
  const [error, setError] = useState("");

  const educations = useStore(sharedEducations.store);
  if (!educations.length) return null;
  const education = educations[0];

  function redirectToEducation() {
    window.location.href = `/resumes/${props.resumeId}/educations`;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sharedBackend()
      .updateEducation(education)
      .catch((err) => {
        setError(err.message ?? "Error");
        throw err;
      });
    redirectToEducation();
  }

  async function cancel() {
    redirectToEducation();
  }

  async function deleteEducation() {
    await sharedBackend().deleteEducation(education.id);
    redirectToEducation();
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <TextInput
        label="Title"
        name="title"
        value={education.title}
        required
        placeholder="Title"
        onInput={(value) =>
          sharedEducations.update(education.id, { title: value })
        }
      />
      <TextInput
        label="Institution"
        name="institution"
        value={education.institution}
        required
        placeholder="Title"
        onInput={(value) =>
          sharedEducations.update(education.id, { institution: value })
        }
      />
      <DateInput
        label="Start date"
        name="startDate"
        value={education.startDate}
        onInput={(value) =>
          sharedEducations.update(education.id, { startDate: value })
        }
      />
      <DateInput
        label="End date"
        name="endDate"
        value={education.endDate}
        onInput={(value) =>
          sharedEducations.update(education.id, { endDate: value })
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
