<template>
  <div class="min-h-screen flex flex-col relative">
    <Title>My Resumes</Title>
    <NuxtLoadingIndicator color="#1d4ed8" />
    <TheHeader />
    <div class="h-20"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      src: "https://kit.fontawesome.com/0848db7773.js",
      crossorigin: "anonymous",
    },
  ],
});

const auth = useAuth();

await useAsyncData("start-auth", async () => {
  console.log("validating token");
  await auth.validateToken();
  console.log("validating token DONE");
});
</script>

<style></style>
