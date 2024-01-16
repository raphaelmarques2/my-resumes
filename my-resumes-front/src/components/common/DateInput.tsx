import moment from "moment";

interface Props {
  label: string;
  value?: string;
  name?: string;
  onInput?: (value: string | undefined) => void;
}

export function DateInput({ label, value, name, onInput }: Props) {
  return (
    <label htmlFor={name} className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        id={name}
        className="input input-bordered input-sm w-full"
        type="date"
        value={value ? moment(value).format("yyyy-MM-DD") : undefined}
        name={name}
        onInput={(event) =>
          onInput &&
          onInput(
            event.currentTarget.value
              ? moment(event.currentTarget.value).toISOString()
              : undefined
          )
        }
      />
    </label>
  );
}
