<template>
  <div class="flex space-x-10">
    <div class="w-80 border p-4 space-y-4">
      <TextField label="Name" v-model="profile.name" />
      <TextField label="E-mail" v-model="profile.email" />
      <TextField label="Address" v-model="profile.address" />
      <TextField label="LinkedIn" v-model="profile.linkedin" />
      <div class="text-center">
        <MainButton
          label="Continue"
          class="w-60"
          @click="saveAndContinue()"
          :loading="isLoading"
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

const backend = useBackend();
const router = useRouter();
const auth = useAuth();

if (!auth.state.user) {
  await router.replace("/");
}

const { resume } = await useAsyncResume(id);
const { profile } = await useAsyncProfile(auth.state.user!.id);

const isLoading = ref(false);
async function saveAndContinue() {
  try {
    isLoading.value = true;
    await backend.api.profiles.patchProfile(profile.value.id, {
      name: profile.value.name,
      email: profile.value.email,
      address: profile.value.address,
      linkedin: profile.value.linkedin,
    });
    await router.push(`/resumes/${id}/experiences`);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped></style>
