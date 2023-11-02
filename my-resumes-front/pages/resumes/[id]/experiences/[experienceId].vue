<template>
  <div class="flex space-x-10">
    <div class="w-80 border p-4 space-y-4">
      <ExperienceListItem
        :experience="experience"
        @deleted="$router.push(`/resumes/${id}/experiences`)"
        :checked="isOnResume()"
        @update:checked="(value) => updateExperienceOnResume(value)"
        :isOpen="true"
        :alwaysOpen="true"
      />
    </div>
    <div class="w-80 border p-2">
      <p class="text-sm font-bold">Work Experience</p>
      <FakePdfExperience :experience="experience" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;
const experienceId = route.params.experienceId as string;

const backend = useBackend();
const router = useRouter();
const auth = useAuth();

if (!auth.state.user) {
  await router.replace("/");
}

const { experience } = await useAsyncExperience(experienceId);

const { resume } = await useAsyncResume(id);

const isLoading = ref(false);

function isOnResume(): boolean {
  return resume.value.experiences.includes(experience.value.id);
}
function updateExperienceOnResume(include: boolean) {
  const updatedExperiences = resume.value.experiences.filter(
    (e) => e !== experience.value.id
  );
  if (include) {
    updatedExperiences.push(experience.value.id);
  }
  resume.value.experiences = updatedExperiences;
}
</script>

<style scoped></style>
