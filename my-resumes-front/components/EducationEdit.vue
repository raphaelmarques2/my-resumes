<template>
  <div class="border border-gray-100 rounded-lg shadow-md px-4 pt-1 pb-4">
    <div class="flex items-center space-x-4">
      <div class="flex-1">
        <div class="font-semibold">{{ education.title }}</div>
        <div class="text-sm">{{ education.institution }}</div>
      </div>
    </div>
    <div class="border-b border-gra-500 my-4"></div>
    <div class="space-y-4">
      <TextField label="Title" v-model="education.title" />
      <TextField label="Company" v-model="education.institution" />
      <DateField label="Start date" v-model="education.startDate" />
      <DateField label="End date" v-model="education.endDate" />
      <MainButton label="Update" @click="updateEducation()" class="w-full" />
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
        <p>Do you want to delete this education?</p>
        <form method="dialog" class="mt-10 flex justify-end space-x-4">
          <TextButton type="submit" label="No" />
          <TextButton type="submit" label="Yes" @click="deleteEducation()" />
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { EducationDto } from "~/services/backend/generated";

const route = useRoute();
const router = useRouter();
const auth = useAuth();

const id = route.params.id;
const userId = auth.state.user!.id;

const educationsLoader = await useAsyncEducations(userId);

const props = defineProps<{
  education: EducationDto;
}>();

const emit = defineEmits<{
  deleted: [];
}>();

const backend = useBackend();

const isLoadingDelete = ref(false);

async function deleteEducation() {
  try {
    isLoadingDelete.value = true;
    await backend.api.educations.deleteEducation(props.education.id);
    await educationsLoader.refresh();
    emit("deleted");
  } finally {
    isLoadingDelete.value = false;
  }
}
async function updateEducation() {
  await backend.api.educations.patchEducation(props.education.id, {
    title: props.education.title,
    institution: props.education.institution,
    startDate: props.education.startDate || "",
    endDate: props.education.endDate || "",
  });
  await educationsLoader.refresh();
  await router.push(`/resumes/${id}/education`);
}

const dialogRef = ref<HTMLDialogElement | null>(null);
</script>

<style scoped></style>
