<template>
  <div class="flex space-x-10">
    <div class="w-80 border p-4 space-y-4">
      <div v-for="experience in experiences" :key="experience.id">
        <ExperienceListItem
          :experience="experience"
          @deleted="
            expanded = '';
            refreshExperiences();
          "
          :checked="isOnResume(experience)"
          @update:checked="
            (value) => updateExperienceOnResume(experience, value)
          "
          :isOpen="expanded === experience.id"
          @open="expanded = experience.id"
          @close="expanded = ''"
        />
      </div>
      <div class="text-center space-y-4">
        <TextButton
          label="Add new experience"
          icon="plus"
          @click="addExperience()"
        />
        <MainButton
          label="Save and Continue"
          class="w-60"
          :loading="isLoading"
          @click="saveAndContinue()"
        />
      </div>
    </div>
    <div class="w-80 border p-2">
      <p class="text-sm font-bold">Work Experience</p>
      <template v-if="expanded">
        <FakePdfExperience
          :experience="experiences.find(e => e.id === expanded)!"
        />
      </template>
      <template v-else>
        <template v-for="experience in experiences" :key="experience.id">
          <FakePdfExperience
            v-if="resume.experiences.includes(experience.id)"
            :experience="experience"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExperienceDto } from "~/services/backend/generated";

const route = useRoute();
const id = route.params.id as string;

const backend = useBackend();
const router = useRouter();
const auth = useAuth();

if (!auth.state.user) {
  await router.replace("/");
}

const userId = auth.state.user!.id;

const { experiences, refresh: refreshExperiences } = await useAsyncExperiences(
  userId
);

const { resume } = await useAsyncResume(id);

const isLoading = ref(false);

function isOnResume(experience: ExperienceDto): boolean {
  return resume.value.experiences.includes(experience.id);
}
function updateExperienceOnResume(experience: ExperienceDto, include: boolean) {
  const updatedExperiences = resume.value.experiences.filter(
    (e) => e !== experience.id
  );
  if (include) {
    updatedExperiences.push(experience.id);
  }
  resume.value.experiences = updatedExperiences;
}

async function saveAndContinue() {
  try {
    isLoading.value = true;
    await backend.api.resumes.patchResume(id, {
      experiences: resume.value.experiences,
    });
    await router.push(`/resumes/${id}/review`);
  } finally {
    isLoading.value = false;
  }
}

async function addExperience() {
  const newExperience = await backend.api.experiences.createExperience({
    title: "(title)",
    companyName: "(company name)",
    technologies: [],
    userId: auth.state.user!.id,
  });
  await refreshExperiences();
  await router.push(`/resumes/${id}/experiences/${newExperience.id}`);
  //expanded.value = newExperience.id;
}

const expanded = ref("");
</script>

<style scoped></style>
