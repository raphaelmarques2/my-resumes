<template>
  <div class="space-x-2">
    <NuxtLink :to="`/resumes/${id}/resume`">
      <StepItem
        label="Resume"
        :icon="step <= StepNumber.Resume ? 'info' : 'check'"
        :selected="step === StepNumber.Resume"
        :border="step === StepNumber.Resume"
      />
    </NuxtLink>
    <StepSeparator />
    <NuxtLink :to="`/resumes/${id}/profile`">
      <StepItem
        label="Profile"
        :icon="step <= StepNumber.Profile ? 'document' : 'check'"
        :selected="step === StepNumber.Profile"
        :border="step === StepNumber.Profile"
      />
    </NuxtLink>
    <StepSeparator />
    <NuxtLink :to="`/resumes/${id}/experiences`">
      <StepItem
        label="Experiences"
        :icon="step <= StepNumber.Experiences ? 'list' : 'check'"
        :selected="step === StepNumber.Experiences"
        :border="step === StepNumber.Experiences"
      />
    </NuxtLink>
    <StepSeparator />
    <NuxtLink :to="`/resumes/${id}/review`">
      <StepItem
        label="Review"
        :icon="step <= StepNumber.Review ? 'download' : 'check'"
        :selected="step === StepNumber.Review"
        :border="step === StepNumber.Review"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

enum StepNumber {
  Resume = 1,
  Profile = 2,
  Experiences = 3,
  Review = 4,
}

function findStep(pathname: string): StepNumber {
  if (pathname.endsWith("/resume")) return 1;
  if (pathname.endsWith("/profile")) return 2;
  if (pathname.includes("/experiences")) return 3;
  if (pathname.endsWith("/review")) return 4;
  return 1;
}

const step = computed(() => findStep(route.path));
</script>

<style scoped></style>
