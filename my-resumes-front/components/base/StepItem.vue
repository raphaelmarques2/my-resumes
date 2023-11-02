<template>
  <div
    class="inline-block rounded-full pl-2 pr-3 py space-x-1 border"
    :class="[border ? 'border-blue-800' : 'border-white']"
  >
    <Icon :name="icon" class="text-blue-800" />
    <span class="text-sm" :class="[selected ? 'font-semibold' : '']">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { IconName } from "./IconName";

defineProps<{
  label: String;
  icon: IconName;
  border: Boolean;
  selected: Boolean;
}>();
</script>

<style scoped></style>
