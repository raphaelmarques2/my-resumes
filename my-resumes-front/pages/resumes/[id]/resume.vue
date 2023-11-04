<template>
  <div class="flex space-x-10">
    <div class="w-80 border p-4 space-y-4">
      <TextField label="Title" v-model="resume.title" />
      <TextField label="Description" v-model="resume.description" area />
      <div class="text-center">
        <MainButton
          label="Save and Continue"
          class="w-60"
          @click="saveAndContinue()"
          :loading="isLoading"
        />
      </div>
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
    <div class="w-80 border p-2">
      <FakePdfHeader :resume="resume" :profile="profile" />
    </div>
  </div>
  <dialog ref="dialogRef" class="p-8 rounded shadow-lg">
    <div>
      <p>Do you want to delete this resume?</p>
      <form method="dialog" class="mt-10 flex justify-end space-x-4">
        <TextButton type="submit" label="No" />
        <TextButton type="submit" label="Yes" @click="deleteResume()" />
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const auth = useAuth();
const backend = useBackend();
const router = useRouter();
const userId = auth.state.user!.id;

const { resume } = await useAsyncResume(id);
const { profile } = await useAsyncProfile(userId);

const isLoading = ref(false);
const isLoadingDelete = ref(false);

async function deleteResume() {
  try {
    isLoadingDelete.value = true;
    await backend.api.resumes.deleteResume(id);
    router.push("/my-resumes");
  } finally {
    isLoadingDelete.value = false;
  }
}

async function saveAndContinue() {
  try {
    isLoading.value = true;
    await backend.api.resumes.patchResume(id, {
      title: resume.value.title,
      description: resume.value.description,
    });
    await router.push(`/resumes/${id}/profile`);
  } finally {
    isLoading.value = false;
  }
}

const dialogRef = ref<HTMLDialogElement | null>(null);
</script>

<style scoped></style>
