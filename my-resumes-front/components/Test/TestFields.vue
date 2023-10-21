<template>
  <div>
    <div>Fields</div>
    <div class="space-x-2">
      <div>Name: {{ name }}</div>
      <TextField label="Name" v-model="name" />
      <TextField label="Name" area v-model="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref("Raphael");
</script>

<style scoped></style>
