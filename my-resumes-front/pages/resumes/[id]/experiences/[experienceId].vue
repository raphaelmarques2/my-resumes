<template>
  <div class="flex space-x-10">
    <div class="w-80 border p-4 space-y-4">
      <ExperienceEdit
        :experience="experience"
        @deleted="$router.push(`/resumes/${id}/experiences`)"
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

const router = useRouter();
const auth = useAuth();

if (!auth.state.user) {
  await router.replace("/");
}

const { experience } = await useAsyncExperience(experienceId);
</script>

<style scoped></style>
