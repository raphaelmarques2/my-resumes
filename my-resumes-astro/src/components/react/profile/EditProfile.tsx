import { useState, type FormEvent } from "react";
import type { Profile } from "../../../services/types/Profile";
import { FormSubmit } from "../FormSubmit";
import { TextInput } from "../TextInput";
import { sharedProfile } from "../../../stores/sharedProfile";
import { useStore } from "@nanostores/react";
import { backend } from "../../../services/backend";

export function EditProfile(props: { profile: Profile }) {
  const [error, setError] = useState("");

  const profile = useStore(sharedProfile);
  if (!profile) return <div>empt</div>;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await backend.updateProfile(sharedProfile.get()!).catch((err) => {
      setError(err.message ?? "Error");
      throw err;
    });
    window.location.href = `/resumes/${props.profile.id}/educations`;
  }

  return (
    <form className="w-80 form-card" onSubmit={(e) => submit(e)}>
      <TextInput
        label="Name"
        value={profile.name}
        name="name"
        required
        placeholder="My name"
        onInput={(value) => sharedProfile.set({ ...profile, name: value })}
      />
      <TextInput
        label="Email"
        value={profile.email}
        name="email"
        type="email"
        required
        placeholder="me@email.com"
        onInput={(value) => sharedProfile.set({ ...profile, email: value })}
      />
      <TextInput
        label="Address"
        value={profile.address}
        name="address"
        placeholder="City, State, Country..."
        onInput={(value) => sharedProfile.set({ ...profile, address: value })}
      />
      <TextInput
        label="LinkedIn"
        value={profile.linkedin}
        name="linkedin"
        placeholder="http://linkedin.com/in/..."
        onInput={(value) => sharedProfile.set({ ...profile, linkedin: value })}
      />

      <FormSubmit error={error} />
    </form>
  );
}
