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
          @click="deleteResume()"
          :loading="isLoadingDelete"
        />
      </div>
    </div>
    <div class="w-80 border p-2">
      <FakePdfHeader :resume="resume" :profile="profile" />
    </div>
  </div>
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
  if (confirm("Please confirm you want to delete this resume.")) {
    try {
      isLoadingDelete.value = true;
      await backend.api.resumes.deleteResume(id);
      router.push("/my-resumes");
    } finally {
      isLoadingDelete.value = false;
    }
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
</script>

<style scoped></style>
