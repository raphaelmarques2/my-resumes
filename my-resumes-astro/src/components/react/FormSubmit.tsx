interface Props {
  error?: string;
  submitLabel?: string;
}

export function FormSubmit({ error, submitLabel }: Props) {
  return (
    <div className="flex flex-col items-center mt-4">
      {error && <p className="text-error">{error}</p>}

      <button className="btn btn-primary btn-wide" type="submit">
        {submitLabel ?? "Save and Continue"}
      </button>
    </div>
  );
}
