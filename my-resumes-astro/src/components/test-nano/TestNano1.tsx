import { useStore } from "@nanostores/react";
import { userStore } from "../../stores/itemStore";
import { useEffect } from "react";

export function TestNano1({ startValue }: { startValue: number }) {
  const user = useStore(userStore);

  useEffect(() => {
    userStore.set({
      ...user,
      count: startValue,
    });
  }, []);

  function inc() {
    userStore.set({
      ...user,
      count: user.count + 1,
    });
  }

  return (
    <div className="w-80 border border-gray-200">
      <div>TestNano1</div>
      <div>Name: {user.name}</div>
      <div>Count: {user.count}</div>
      <button className="btn btn-sm" onClick={inc}>
        Inc
      </button>
    </div>
  );
}
