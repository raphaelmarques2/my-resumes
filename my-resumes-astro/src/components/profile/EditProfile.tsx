import { useState, type FormEvent } from "react";
import type { Profile } from "../../services/types/Profile";
import { FormSubmit } from "../common/FormSubmit";
import { TextInput } from "../common/TextInput";
import { sharedProfile } from "../../stores/sharedProfile";
import { useStore } from "@nanostores/react";
import { backend } from "../../services/backend";

export function EditProfile(props: { resumeId: string }) {
  const [error, setError] = useState("");

  const profile = useStore(sharedProfile.store);
  if (!profile) return <div>empt</div>;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await backend.updateProfile(profile!).catch((err) => {
      setError(err.message ?? "Error");
      throw err;
    });
    window.location.href = `/resumes/${props.resumeId}/educations`;
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <TextInput
        label="Name"
        name="name"
        value={profile.name}
        required
        placeholder="My name"
        onInput={(value) => sharedProfile.update({ name: value })}
      />
      <TextInput
        label="Email"
        name="email"
        value={profile.email}
        type="email"
        required
        placeholder="me@email.com"
        onInput={(value) => sharedProfile.update({ email: value })}
      />
      <TextInput
        label="Address"
        name="address"
        value={profile.address}
        placeholder="City, State, Country..."
        onInput={(value) => sharedProfile.update({ address: value })}
      />
      <TextInput
        label="LinkedIn"
        name="linkedin"
        value={profile.linkedin}
        placeholder="http://linkedin.com/in/..."
        onInput={(value) => sharedProfile.update({ linkedin: value })}
      />

      <FormSubmit error={error} />
    </form>
  );
}
