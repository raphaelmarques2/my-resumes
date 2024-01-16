import { useStore } from "@nanostores/react";
import { useState, type FormEvent, type MouseEvent } from "react";
import { sharedBackend } from "../../stores/sharedBackend";
import { sharedResume } from "../../stores/sharedResume";
import { FormSubmit } from "../common/FormSubmit";
import { TextInput } from "../common/TextInput";

export function EditResume(props: { resumeId: string }) {
  const [error, setError] = useState("");

  const resume = useStore(sharedResume.store);
  if (!resume) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sharedBackend()
      .updateResume(resume!)
      .catch((err) => {
        setError(err.message ?? "Error");
        throw err;
      });
    window.location.href = `/resumes/${props.resumeId}/profile`;
  }

  async function clickDeleteResume(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const dialog = document.getElementById(
      "deleteResumeDialog"
    ) as HTMLDialogElement | null;
    if (!dialog) return;
    dialog.showModal();
    dialog.addEventListener("close", () => {
      const returnValue = dialog.returnValue;
      if (returnValue === "true") {
        deleteResume();
      }
    });
  }
  async function deleteResume() {
    if (!resume) return;
    await sharedBackend().deleteResume(resume.id);
    window.location.href = "/resumes";
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

      <FormSubmit error={error}>
        <button
          className="btn btn-ghost btn-wide"
          onClick={(e) => clickDeleteResume(e)}
        >
          Delete
        </button>

        <dialog id="deleteResumeDialog" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete resume?</h3>
            <p className="pt-4">Are you sure you want to delete this resume?</p>
            <p className="pb-4">This action cannot be undone.</p>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost mx-4" value="true">
                  Delete
                </button>
                <button className="btn btn-primary" value="false">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </FormSubmit>
    </form>
  );
}
