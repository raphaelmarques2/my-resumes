<template>
  <main class="flex flex-col items-center space-y-6">
    <h1 class="text-blue-600">My Resumes</h1>
    <p class="max-w-md text-center font-semibold">
      Create impactful resumes for various job roles!
    </p>
    <p class="max-w-md text-center font-semibold">
      Add your profile, experiences, and skills and share this details across
      multiple resumes, ensuring each one is perfectly tailored for your
      specific job applications.
    </p>
    <div v-if="!auth.isLoggedIn.value" class="text-center">
      <p>Start by creating your account!</p>
      <NuxtLink to="/signup">
        <MainButton label="Click here" class="w-80 mt-4" />
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const auth = useAuth();
</script>

<style scoped></style>
