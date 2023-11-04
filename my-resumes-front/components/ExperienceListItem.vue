<template>
  <NuxtLink :to="`/resumes/${id}/experiences/${experience.id}`">
    <div
      class="border border-gray-100 rounded-lg shadow-md px-4 py-1 flex items-center space-x-4 hover:bg-gray-100"
    >
      <input
        type="checkbox"
        :checked="checked"
        @input="(e) => $emit('update:checked', (e.target as HTMLInputElement).checked)"
        @click.stop=""
      />
      <div class="flex-1">
        <div class="font-semibold">{{ experience.title }}</div>
        <div class="text-sm">{{ experience.companyName }}</div>
      </div>
      <Icon name="edit" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ExperienceDto } from "~/services/backend/generated";

const route = useRoute();
const id = route.params.id;

defineProps<{
  experience: ExperienceDto;
  checked: boolean;
}>();

const emit = defineEmits<{
  "update:checked": [checked: boolean];
}>();
</script>

<style scoped></style>
