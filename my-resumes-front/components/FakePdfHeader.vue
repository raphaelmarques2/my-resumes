<template>
  <div class="text-xs space-y-1 mt-2">
    <div>
      <p class="text-base font-bold text-center">{{ profile.name }}</p>
      <p class="font-bold text-center">{{ resume.title }}</p>
    </div>
    <div>
      <p v-if="profile.address">{{ profile.address }}</p>
      <p v-if="profile.email">E-mail: {{ profile.email }}</p>
      <p v-if="profile.linkedin">LinkedIn: {{ profile.linkedin }}</p>
    </div>
    <div class="border-b border-black w-full"></div>
    <p class="font-bold">Profile</p>
    <p class="text-justify">{{ resume.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ProfileDto, ResumeDto } from "~/services/backend/generated";

defineProps<{
  profile: ProfileDto;
  resume: ResumeDto;
}>();
</script>

<style scoped></style>
