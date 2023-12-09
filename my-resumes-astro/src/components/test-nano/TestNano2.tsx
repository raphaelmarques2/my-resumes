import { useStore } from "@nanostores/react";
import { userStore } from "../../stores/itemStore";

export function TestNano2() {
  const user = useStore(userStore);

  function inc() {
    userStore.set({
      ...user,
      count: user.count + 1,
    });
  }

  return (
    <div className="w-80 border border-gray-200">
      <div>TestNano2</div>
      <div>Name: {user.name}</div>
      <div>Count: {user.count}</div>
      <button className="btn btn-sm" onClick={inc}>
        Inc
      </button>
    </div>
  );
}
