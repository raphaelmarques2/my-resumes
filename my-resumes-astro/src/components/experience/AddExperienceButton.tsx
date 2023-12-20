import { sharedBackend } from "../../stores/sharedBackend";

export function AddExperienceButton(props: { resumeId: string }) {
  async function add() {
    const experience = await sharedBackend().addExperience();
    window.location.href = `/resumes/${props.resumeId}/experiences/${experience.id}`;
  }

  return (
    <button
      className="btn btn-ghost btn-wide"
      type="button"
      onClick={() => add()}
    >
      Add new experience
      <i className="fa fa-add" aria-hidden="true"></i>
    </button>
  );
}
