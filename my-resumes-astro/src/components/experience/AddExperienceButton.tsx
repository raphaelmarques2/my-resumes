import { backend } from "../../services/backend";

export function AddExperienceButton(props: { resumeId: string }) {
  async function add() {
    const experience = await backend.addExperience();
    window.location.href = `/resumes/${props.resumeId}/experiences/${experience.id}`;
  }

  return (
    <button className="btn btn-ghost btn-wide" onClick={() => add()}>
      Add new experience
      <i className="fa fa-add" aria-hidden="true"></i>
    </button>
  );
}
