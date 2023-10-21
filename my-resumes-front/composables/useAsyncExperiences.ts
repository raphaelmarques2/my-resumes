import { ExperienceDto, ProfileDto } from "~/services/backend/generated";

export async function useAsyncExperiences(userId: string) {
  const backend = useBackend();

  const experiences = useState<ExperienceDto[] | null>(
    `experiences-from-${userId}`,
    () => null
  );

  const isRefreshing = ref(false);

  const asyncData = await useAsyncData(
    `experiences-from-${userId}`,
    async () => {
      if (!isRefreshing.value && experiences.value) return experiences.value;
      const data = await backend.api.experiences.listUserExperiences(userId);
      experiences.value = data;
      return data;
    }
  );

  if (experiences.value === null) {
    throw new Error("Experiences not loaded");
  }

  async function refresh() {
    isRefreshing.value = true;
    await asyncData.refresh();
    isRefreshing.value = false;
  }

  return {
    experiences: experiences as Ref<ExperienceDto[]>,
    refresh,
  };
}
