import { ProfileDto } from "~/services/backend/generated";

export async function useAsyncProfile(userId: string) {
  const backend = useBackend();

  const profile = useState<ProfileDto | null>(
    `profile-from-${userId}`,
    () => null
  );

  await useAsyncData(`profile-from-${userId}`, async () => {
    if (profile.value) return profile.value;
    const data = await backend.api.profiles.getProfileByUserId(userId);
    profile.value = data;
    return data;
  });

  if (!profile.value) {
    throw new Error("Resume not loaded");
  }

  return {
    profile: profile as Ref<ProfileDto>,
  };
}
