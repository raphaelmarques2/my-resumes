<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const id = route.params.id;

router.replace(`/resumes/${id}/resume`);
</script>

<style scoped></style>
