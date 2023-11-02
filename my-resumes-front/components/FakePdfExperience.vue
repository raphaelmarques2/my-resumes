<template>
  <div class="text-xs space-y-1 mt-2">
    <p class="font-bold">{{ experience.title }}</p>
    <p>{{ experience.companyName }} - {{ time }}</p>
    <p class="text-justify">{{ experience.description }}</p>
    <p v-if="experience.technologies.length > 0" class="text-justify">
      Main technologies: {{ experience.technologies.join(", ") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ExperienceDto } from "~/services/backend/generated";
import { getExperienceTime } from "~/services/utils";

const props = defineProps<{
  experience: ExperienceDto;
}>();

const time = computed(() => {
  return getExperienceTime(props.experience);
});
</script>

<style scoped></style>
