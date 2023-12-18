import { useStore } from "@nanostores/react";
import { useState, type FormEvent } from "react";
import { backend } from "../../services/backend";
import { sharedExperiences } from "../../stores/sharedExperiences";
import { TextInput } from "../common/TextInput";

export function EditExperience(props: { resumeId: string }) {
  const [error, setError] = useState("");

  const experiences = useStore(sharedExperiences.store);
  if (!experiences.length) return null;
  const experience = experiences[0];

  function redirectToExperiences() {
    window.location.href = `/resumes/${props.resumeId}/experiences`;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await backend.updateExperience(experience).catch((err) => {
      setError(err.message ?? "Error");
      throw err;
    });
    redirectToExperiences();
  }

  async function cancel() {
    redirectToExperiences();
  }

  async function deleteExperience() {
    await backend.deleteExperience(experience.id);
    redirectToExperiences();
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <TextInput
        label="Title"
        value={experience.title}
        required
        placeholder="Title"
        onInput={(value) =>
          sharedExperiences.update(experience.id, { title: value })
        }
      />
      <TextInput
        label="Company"
        value={experience.company}
        required
        placeholder="Company"
        onInput={(value) =>
          sharedExperiences.update(experience.id, { company: value })
        }
      />
      <TextInput
        label="Description"
        value={experience.description}
        placeholder="Description"
        area
        onInput={(value) =>
          sharedExperiences.update(experience.id, { description: value })
        }
      />
      <TextInput
        label="Start date"
        value={experience.startDate}
        type="date"
        onInput={(value) =>
          sharedExperiences.update(experience.id, { startDate: value })
        }
      />
      <TextInput
        label="End date"
        value={experience.endDate}
        type="date"
        onInput={(value) =>
          sharedExperiences.update(experience.id, { endDate: value })
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
          onClick={() => deleteExperience()}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
