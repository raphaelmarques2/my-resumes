import { EducationDto } from "~/services/backend/generated";

export async function useAsyncEducation(id: string) {
  const backend = useBackend();

  const education = useState<EducationDto | null>(
    `education-${id}`,
    () => null
  );

  const isRefreshing = ref(false);

  const asyncData = await useAsyncData(`education-${id}`, async () => {
    if (!isRefreshing.value && education.value) return education.value;
    const data = await backend.api.educations.getEducation(id);
    education.value = data;
    return data;
  });

  if (education.value === null) {
    throw new Error("Education not loaded");
  }

  async function refresh() {
    isRefreshing.value = true;
    await asyncData.refresh();
    isRefreshing.value = false;
  }

  return {
    education: education as Ref<EducationDto>,
    refresh,
  };
}
