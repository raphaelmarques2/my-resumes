<template>
  <button
    class="px-6 py-2 rounded disabled:opacity-70"
    :class="[
      safeColor === 'primary'
        ? 'bg-blue-800 text-white hover:bg-blue-700 active:bg-blue-600'
        : '',
      safeColor === 'black'
        ? 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700'
        : '',
    ]"
    :type="type"
    :disabled="loading"
    @click="(e) => onClick(e)"
  >
    <span v-if="loading" class="mr-2">
      <Icon name="spinner" :rotating="true" />
    </span>

    <span>{{ props.label }}</span>

    <span v-if="icon" class="ml-2">
      <Icon :name="icon" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ButtonHTMLAttributes } from "vue";
import { IconName } from "./IconName";
const props = defineProps<{
  label: string;
  color?: "primary" | "black";
  type?: ButtonHTMLAttributes["type"];
  icon?: IconName;
  loading?: boolean;
}>();

const emit = defineEmits(["click"]);

const safeColor = computed(() => {
  if (props.color && ["primary", "black"].includes(props.color))
    return props.color;
  return "primary";
});

function onClick(e: Event) {
  emit("click", e);
}
</script>

<style scoped></style>
