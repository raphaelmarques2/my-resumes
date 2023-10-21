<template>
  <span class="inline-flex w-6 h-6 justify-center items-center">
    <i
      :class="['fa', fontName, rotating ? 'rotating' : '']"
      aria-hidden="true"
    />
  </span>
</template>

<script setup lang="ts">
import { IconName, iconNameToFontIconMap } from "./IconName";
const props = defineProps<{ name: IconName; rotating?: boolean }>();
const fontName = computed(() => iconNameToFontIconMap[props.name]);
</script>

<style scoped>
.rotating {
  -webkit-animation: spin 2s linear infinite;
  -moz-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
