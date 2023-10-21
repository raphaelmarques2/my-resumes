import { ResumeDto } from "~/services/backend/generated";

export async function useAsyncResume(id: string) {
  const backend = useBackend();

  const resume = useState<ResumeDto | null>(`resume-${id}`, () => null);

  await useAsyncData(`resume-${id}`, async () => {
    if (resume.value) return resume.value;
    const data = await backend.api.resumes.getResumeById(id);
    resume.value = data;
    return data;
  });

  if (!resume.value) {
    throw new Error("Resume not loaded");
  }

  return {
    resume: resume as Ref<ResumeDto>,
  };
}
