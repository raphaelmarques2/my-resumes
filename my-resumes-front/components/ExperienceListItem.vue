<template>
  <div
    v-if="!isOpen"
    class="border border-gray-100 rounded-lg shadow-md p-4 flex items-center space-x-4"
  >
    <input
      type="checkbox"
      :checked="checked"
      @input="(e) => $emit('update:checked', (e.target as HTMLInputElement).checked)"
    />
    <div class="flex-1">
      <div class="font-semibold">{{ experience.title }}</div>
      <div class="text-sm">{{ experience.companyName }}</div>
    </div>
    <button @click="deleteExperience()">
      <Icon name="delete" class="text-red-500" />
    </button>
    <button @click="isOpen = !isOpen">
      <Icon name="chevrondown" />
    </button>
  </div>
  <div v-else class="border border-gray-100 rounded-lg shadow-md p-4">
    <div class="flex items-center space-x-4">
      <input
        type="checkbox"
        :checked="checked"
        @input="(e) => $emit('update:checked', (e.target as HTMLInputElement).checked)"
      />
      <div class="flex-1"></div>
      <button @click="deleteExperience()">
        <Icon name="delete" class="text-red-500" />
      </button>
      <button @click="isOpen = !isOpen">
        <Icon name="chevroup" />
      </button>
    </div>
    <div class="space-y-4">
      <TextField label="Title" v-model="experience.title" />
      <TextField label="Company" v-model="experience.companyName" />
      <TextField label="Description" v-model="experience.description" area />
      <TextField label="Start date" v-model="experience.startDate" />
      <TextField label="End date" v-model="experience.endDate" />
      <MainButton label="Update" @click="updateExperience()" class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExperienceDto } from "~/services/backend/generated";

const props = defineProps<{
  experience: ExperienceDto;
  checked: boolean;
}>();
const emit = defineEmits<{
  deleted: [];
  "update:checked": [checked: boolean];
}>();

const backend = useBackend();

const isOpen = ref(false);

async function deleteExperience() {
  await backend.api.experiences.deleteExperience(props.experience.id);
  emit("deleted");
}
async function updateExperience() {
  await backend.api.experiences.patchExperience(props.experience.id, {
    title: props.experience.title,
    companyName: props.experience.companyName,
    description: props.experience.description,
    startDate: props.experience.startDate,
    endDate: props.experience.endDate,
  });
  isOpen.value = false;
}
</script>

<style scoped></style>
