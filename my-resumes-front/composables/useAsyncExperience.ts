import { ExperienceDto } from "~/services/backend/generated";

export async function useAsyncExperience(id: string) {
  const backend = useBackend();

  const experience = useState<ExperienceDto | null>(
    `experience-${id}`,
    () => null
  );

  const isRefreshing = ref(false);

  const asyncData = await useAsyncData(`experience-${id}`, async () => {
    if (!isRefreshing.value && experience.value) return experience.value;
    const data = await backend.api.experiences.getExperience(id);
    experience.value = data;
    return data;
  });

  if (experience.value === null) {
    throw new Error("Experience not loaded");
  }

  async function refresh() {
    isRefreshing.value = true;
    await asyncData.refresh();
    isRefreshing.value = false;
  }

  return {
    experience: experience as Ref<ExperienceDto>,
    refresh,
  };
}
