import { useState } from "react";

export function ResumePdf() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button className="btn" onClick={() => setCount((c) => c + 1)}>
        Count ({count})
      </button>
    </div>
  );
}
