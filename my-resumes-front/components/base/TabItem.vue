<template>
  <span :class="[selected ? 'font-bold border-b-2 border-blue-800' : '']">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  selected: { type: Boolean, required: true },
});
</script>

<style scoped></style>
