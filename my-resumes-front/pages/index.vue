<template>
  <main class="flex flex-col items-center space-y-4">
    <h1 class="text-blue-600">My Resumes</h1>
    <p class="max-w-md text-center font-semibold">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quo
      officia dolore repudiandae suscipit. Nulla quam illum dolore, nostrum vel
      perferendis ipsum eum? Doloribus culpa velit quo ipsa, dolore a!
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
