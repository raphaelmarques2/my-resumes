import { sharedBackend } from "../../stores/sharedBackend";

export function AddResumeExampleButton() {
  async function add() {
    const resume = await sharedBackend().addResumeExample();
    window.location.reload();
  }

  return (
    <button
      className="btn btn-primary btn-wide"
      type="button"
      onClick={() => add()}
    >
      Create resume examples
      <i className="fa fa-add" aria-hidden="true"></i>
    </button>
  );
}
