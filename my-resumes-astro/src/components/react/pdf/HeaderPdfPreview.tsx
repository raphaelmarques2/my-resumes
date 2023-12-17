import { useStore } from "@nanostores/react";
import { type Profile } from "../../../services/types/Profile";
import { sharedResume } from "../../../stores/sharedResume";
import { sharedProfile } from "../../../stores/sharedProfile";

export function HeaderPdfPreview() {
  const resume = useStore(sharedResume);
  const profile = useStore(sharedProfile);

  if (!resume) return null;
  if (!profile) return null;

  return (
    <div className="pdf">
      <div className="name">{profile.name}</div>
      <div className="title">{resume?.title}</div>
      <div className="profile-item">{profile.address}</div>
      <div className="profile-item">
        E-mail: <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
      <div className="profile-item">
        LinkedIn: <a href={profile.linkedin}>{profile.linkedin}</a>
      </div>
      <div className="line"></div>
      <div className="profile-description">{resume?.description}</div>
    </div>
  );
}
