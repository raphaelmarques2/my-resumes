<template>
  <button
    class="px-4 py-1 rounded font-semibold"
    :class="[
      safeColor === 'primary'
        ? 'text-blue-700 hover:bg-blue-100 active:bg-blue-200'
        : '',
      safeColor === 'red'
        ? 'text-red-700 hover:bg-red-100 active:bg-red-200'
        : '',
    ]"
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
import { IconName } from "./IconName";

const props = defineProps<{
  label: string;
  color?: "primary" | "red";
  icon?: IconName;
  loading?: boolean;
}>();

const emit = defineEmits(["click"]);

const safeColor = computed(() => {
  if (props.color && ["primary", "red"].includes(props.color))
    return props.color;
  return "primary";
});

function onClick(e: Event) {
  emit("click", e);
}
</script>

<style scoped></style>
