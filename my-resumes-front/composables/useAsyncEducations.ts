import { EducationDto } from "~/services/backend/generated";

export async function useAsyncEducations(userId: string) {
  const backend = useBackend();

  const educations = useState<EducationDto[] | null>(
    `educations-from-${userId}`,
    () => null
  );

  const isRefreshing = ref(false);

  const asyncData = await useAsyncData(
    `educations-from-${userId}`,
    async () => {
      if (!isRefreshing.value && educations.value) return educations.value;
      const data = await backend.api.educations.listUserEducations(userId);
      educations.value = data;
      return data;
    }
  );

  if (educations.value === null) {
    throw new Error("Educations not loaded");
  }

  async function refresh() {
    isRefreshing.value = true;
    await asyncData.refresh();
    isRefreshing.value = false;
  }

  return {
    educations: educations as Ref<EducationDto[]>,
    refresh,
  };
}
