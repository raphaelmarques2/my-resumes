<template>
  <div class="flex flex-col items-center">
    <h1>{{ resume?.title }}</h1>
    <ResumeStepList class="my-4" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const route = useRoute();
const id = route.params.id as string;

const { resume } = await useAsyncResume(id);
</script>

<style scoped></style>
