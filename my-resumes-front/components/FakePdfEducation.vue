<template>
  <div class="text-xs space-y-1 mt-2">
    <ul class="">
      <li>{{ education.title }} - {{ education.institution }} - {{ time }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { EducationDto } from "~/services/backend/generated";
import { getEducationTime } from "~/services/utils";

const props = defineProps<{
  education: EducationDto;
}>();

const time = computed(() => {
  return getEducationTime(props.education);
});
</script>

<style scoped></style>
