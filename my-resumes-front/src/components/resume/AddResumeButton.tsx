import { sharedBackend } from "../../stores/sharedBackend";

export function AddResumeButton() {
  async function add() {
    const resume = await sharedBackend().addResume();
    window.location.href = `/resumes/${resume.id}`;
  }

  return (
    <button
      className="btn btn-ghost btn-wide"
      type="button"
      onClick={() => add()}
    >
      Create new resume
      <i className="fa fa-add" aria-hidden="true"></i>
    </button>
  );
}
