<template>
  <div class="text-xs space-y-1 mt-2">
    <p class="font-bold">{{ experience.title }}</p>
    <p>{{ experience.companyName }} - {{ start }} - {{ end }}</p>
    <p class="text-justify">{{ experience.description }}</p>
    <p v-if="experience.technologies.length > 0" class="text-justify">
      Main technologies: {{ experience.technologies.join(", ") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ExperienceDto } from "~/services/backend/generated";

const props = defineProps<{
  experience: ExperienceDto;
}>();

const start = computed(() =>
  props.experience.startDate
    ? moment(props.experience.startDate).format("MMM YYYY")
    : ""
);
const end = computed(() =>
  props.experience.endDate
    ? moment(props.experience.endDate).format("MMM YYYY")
    : "Now"
);
</script>

<style scoped></style>
