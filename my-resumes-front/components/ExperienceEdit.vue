<template>
  <div class="border border-gray-100 rounded-lg shadow-md px-4 pt-1 pb-4">
    <div class="flex items-center space-x-4">
      <div class="flex-1">
        <div class="font-semibold">{{ experience.title }}</div>
        <div class="text-sm">{{ experience.company }}</div>
      </div>
    </div>
    <div class="border-b border-gra-500 my-4"></div>
    <div class="space-y-4">
      <TextField label="Title" v-model="experience.title" />
      <TextField label="Company" v-model="experience.company" />
      <TextField label="Description" v-model="experience.description" area />
      <DateField label="Start date" v-model="experience.startDate" />
      <DateField label="End date" v-model="experience.endDate" />
      <TextField label="Main technologies" v-model="technologies" />
      <MainButton label="Update" @click="updateExperience()" class="w-full" />
      <div class="text-center pt-6">
        <TextButton
          label="delete"
          color="red"
          class="w-60"
          @click="dialogRef?.showModal()"
          :loading="isLoadingDelete"
        />
      </div>
    </div>
    <dialog ref="dialogRef" class="p-8 rounded shadow-lg">
      <div>
        <p>Do you want to delete this experience?</p>
        <form method="dialog" class="mt-10 flex justify-end space-x-4">
          <TextButton type="submit" label="No" />
          <TextButton type="submit" label="Yes" @click="deleteExperience()" />
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ExperienceDto } from "~/services/backend/generated";

const route = useRoute();
const router = useRouter();
const auth = useAuth();

const id = route.params.id;
const userId = auth.state.user!.id;

const experiencesLoader = await useAsyncExperiences(userId);

const props = defineProps<{
  experience: ExperienceDto;
}>();

const emit = defineEmits<{
  deleted: [];
}>();

const technologies = ref(props.experience.technologies.join(", "));

watch(technologies, (newValue) => {
  props.experience.technologies = newValue
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
});

const backend = useBackend();

const isLoadingDelete = ref(false);

async function deleteExperience() {
  try {
    isLoadingDelete.value = true;
    await backend.api.experiences.deleteExperience(props.experience.id);
    await experiencesLoader.refresh();
    emit("deleted");
  } finally {
    isLoadingDelete.value = false;
  }
}
async function updateExperience() {
  await backend.api.experiences.patchExperience(props.experience.id, {
    title: props.experience.title,
    company: props.experience.company,
    description: props.experience.description,
    startDate: props.experience.startDate || "",
    endDate: props.experience.endDate || "",
    technologies: props.experience.technologies,
  });
  await experiencesLoader.refresh();
  await router.push(`/resumes/${id}/experiences`);
}

const dialogRef = ref<HTMLDialogElement | null>(null);
</script>

<style scoped></style>
