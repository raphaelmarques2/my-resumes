import { useEffect } from "react";
import type { User } from "../../services/types/User";
import { sharedAuth } from "../../stores/sharedAuth";

export function SetSharedAuth(props: { token?: string; user?: User }) {
  useEffect(() => {
    if (props.token && props.user) {
      sharedAuth.login(props.token, props.user);
    } else {
      sharedAuth.logout();
    }
  }, [props.token, props.user]);

  return null;
}
