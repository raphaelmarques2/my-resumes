<template>
  <div class="flex space-x-10">
    <div class="w-80 border p-4 space-y-4">
      <EducationEdit
        :education="education"
        @deleted="$router.push(`/resumes/${id}/education`)"
      />
    </div>
    <div class="w-80 border p-2">
      <p class="text-sm font-bold">Education</p>
      <FakePdfEducation :education="education" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;
const educationId = route.params.educationId as string;

const router = useRouter();
const auth = useAuth();

if (!auth.state.user) {
  await router.replace("/");
}

const { education } = await useAsyncEducation(educationId);
</script>

<style scoped></style>
