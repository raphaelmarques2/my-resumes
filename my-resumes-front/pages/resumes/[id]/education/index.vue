<template>
  <div class="flex space-x-10 pb-4">
    <div class="w-80 border p-4 space-y-4">
      <div v-for="education in educations" :key="education.id">
        <EducationListItem :education="education" />
      </div>
      <div class="text-center space-y-4">
        <TextButton
          label="Add new education"
          icon="plus"
          @click="addEducation()"
        />
        <MainButton
          label="Save and Continue"
          class="w-60"
          :loading="isLoading"
          @click="saveAndContinue()"
        />
      </div>
    </div>
    <div class="w-80 border p-2">
      <p class="text-sm font-bold">Education</p>
      <template v-for="education in educations" :key="education.id">
        <FakePdfEducation :education="education" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const backend = useBackend();
const router = useRouter();
const auth = useAuth();

if (!auth.state.user) {
  await router.replace("/");
}

const userId = auth.state.user!.id;

const { educations, refresh: refreshEducations } = await useAsyncEducations(
  userId
);

const isLoading = ref(false);

async function saveAndContinue() {
  try {
    isLoading.value = true;
    await router.push(`/resumes/${id}/experiences`);
  } finally {
    isLoading.value = false;
  }
}

async function addEducation() {
  const newEducation = await backend.api.educations.createEducation({
    title: "(title)",
    institution: "(institution)",
    userId: auth.state.user!.id,
  });
  await refreshEducations();
  await router.push(`/resumes/${id}/education/${newEducation.id}`);
}
</script>

<style scoped></style>
