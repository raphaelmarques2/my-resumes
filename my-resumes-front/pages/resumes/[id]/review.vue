<template>
  <div>
    <ClientOnly>
      <PdfView
        :profile="profile"
        :resume="resume"
        :experiences="experiences"
        :educations="educations"
        :width="500"
        :height="500"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const auth = useAuth();
const userId = auth.state.user!.id;

const { profile } = await useAsyncProfile(userId);
const { experiences } = await useAsyncExperiences(userId);
const { resume } = await useAsyncResume(id);
const { educations } = await useAsyncEducations(userId);
</script>

<style scoped></style>
