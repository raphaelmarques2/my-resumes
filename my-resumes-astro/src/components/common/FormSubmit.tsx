import type { ReactNode } from "react";

interface Props {
  error?: string;
  submitLabel?: string;
  children?: ReactNode;
}

export function FormSubmit({ error, submitLabel, children }: Props) {
  return (
    <div className="flex flex-col items-center mt-4 space-y-2">
      {error && <p className="text-error">{error}</p>}

      <button className="btn btn-primary btn-wide" type="submit">
        {submitLabel ?? "Save and Continue"}
      </button>
      {children}
    </div>
  );
}
