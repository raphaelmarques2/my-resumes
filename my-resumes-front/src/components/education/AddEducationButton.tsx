import { sharedBackend } from "../../stores/sharedBackend";

export function AddEducationButton(props: { resumeId: string }) {
  async function add() {
    const education = await sharedBackend().addEducation();
    window.location.href = `/resumes/${props.resumeId}/educations/${education.id}`;
  }

  return (
    <button
      className="btn btn-ghost btn-wide"
      type="button"
      onClick={() => add()}
    >
      Add new education
      <i className="fa fa-add" aria-hidden="true"></i>
    </button>
  );
}
