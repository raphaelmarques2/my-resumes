<template>
  <NuxtLink :to="`/resumes/${resume.id}`">
    <button
      class="my-2 shadow-md rounded-2xl flex w-80 p-4 bg-white border border-gray-100 items-center space-x-2 hover:bg-gray-100"
    >
      <div class="bg-gray-200 rounded-lg text-blue-600 text-xs">
        <Icon name="document" />
      </div>
      <div class="flex-1 text-left">
        <div class="font-semibold">{{ resume.title }}</div>
        <div class="text-xs text-gray-400">Last update: 28/09/2023</div>
      </div>
      <div class="">
        <Icon name="edit" />
      </div>
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ResumeDto } from "~/services/backend/generated";

const props = defineProps<{ resume: ResumeDto }>();

console.log("resumelistitem:", props.resume.id);
</script>

<style scoped></style>
