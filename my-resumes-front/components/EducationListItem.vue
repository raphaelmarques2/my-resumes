<template>
  <NuxtLink :to="`/resumes/${id}/education/${education.id}`">
    <div
      class="border border-gray-100 rounded-lg shadow-md px-4 py-1 flex items-center space-x-4 hover:bg-gray-100"
    >
      <div class="flex-1">
        <div class="font-semibold">{{ education.title }}</div>
        <div class="text-sm">{{ education.institution }}</div>
      </div>
      <Icon name="edit" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { EducationDto } from "~/services/backend/generated";

const route = useRoute();
const id = route.params.id;

defineProps<{
  education: EducationDto;
}>();
</script>

<style scoped></style>
