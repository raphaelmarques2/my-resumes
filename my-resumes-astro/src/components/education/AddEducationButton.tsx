import { backend } from "../../services/backend";

export function AddEducationButton(props: { resumeId: string }) {
  async function add() {
    const education = await backend.addEducation();
    window.location.href = `/resumes/${props.resumeId}/educations/${education.id}`;
  }

  return (
    <button className="btn btn-ghost btn-wide" onClick={() => add()}>
      Add new education
      <i className="fa fa-add" aria-hidden="true"></i>
    </button>
  );
}
