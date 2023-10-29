<template>
  <div class="text-xs space-y-1 mt-2">
    <div>
      <p class="text-base font-bold text-center">{{ $props.profile.name }}</p>
      <p class="font-bold text-center">{{ $props.resume.title }}</p>
    </div>
    <div>
      <p class="">{{ $props.profile.address }}</p>
      <p class="">E-mail: {{ $props.profile.email }}</p>
      <p class="">LinkedIn: {{ $props.profile.linkedin }}</p>
    </div>
    <div class="border-b border-black w-full"></div>
    <p class="font-bold">Profile</p>
    <p class="text-justify">{{ $props.resume.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ProfileDto, ResumeDto } from "~/services/backend/generated";

const props = defineProps<{
  profile: ProfileDto;
  resume: ResumeDto;
}>();
</script>

<style scoped></style>
