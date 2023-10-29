<template>
  <div class="flex flex-col items-center space-y-4">
    <h1>My Resumes</h1>
    <p class="max-w-xs text-center text-sm">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aut, nihil,
      recusandae aliquam aliquid
    </p>
    <TextButton label="Create new" icon="plus" @click="createResume()" />
    <div class="">
      <ClientOnly>
        <ResumeListItem
          v-for="resume in resumes"
          :key="resume.id"
          :resume="resume"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ResumeDto } from "~/services/backend/generated";
definePageMeta({
  middleware: "auth",
});

const backend = useBackend();
const auth = useAuth();
const router = useRouter();

const { data: resumes } = await useAsyncData<ResumeDto[]>(
  "user-resumes",
  async () => {
    if (!auth.state.user) return [];
    const resumes = await backend.api.resumes.listUserResumes(
      auth.state.user.id
    );
    console.log("resumesfound", resumes.length);
    return resumes;
  }
);

async function createResume() {
  const resume = await backend.api.resumes.createResume({
    title: "Title",
    userId: auth.state.user!.id,
  });
  router.push(`/resumes/${resume.id}`);
}
</script>

<style scoped></style>
