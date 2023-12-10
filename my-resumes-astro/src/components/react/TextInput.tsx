interface Props {
  label: string;
  value?: string;
  name: string;
  placeholder: string;
  type?: astroHTML.JSX.HTMLInputTypeAttribute;
  area?: boolean;
  required?: boolean;
  onInput?: (value: string) => void;
}

export function TextInput({
  label,
  value,
  name,
  placeholder,
  type,
  area,
  required,
  onInput,
}: Props) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {area ? (
        <textarea
          className="textarea textarea-bordered textarea-sm w-full"
          value={value}
          name="description"
          placeholder="Description"
          required={required}
          onInput={(event) => onInput && onInput(event.currentTarget.value)}
        />
      ) : (
        <input
          className="input input-bordered input-sm w-full"
          type={type ?? "text"}
          value={value}
          name={name}
          placeholder={placeholder}
          required={required}
          onInput={(event) => onInput && onInput(event.currentTarget.value)}
        />
      )}
    </label>
  );
}
