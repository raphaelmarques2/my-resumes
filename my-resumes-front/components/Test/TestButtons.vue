<template>
  <div>
    <div>Buttons</div>
    <div className="space-x-2">
      <MainButton label="Default" @click="console.log('default')" />
      <MainButton
        label="Primary"
        color="primary"
        @click="console.log('primary')"
      />
      <MainButton label="Black" color="black" @click="console.log('black')" />
      <TextButton label="Text" @click="console.log('text')" />
      <TextButton label="Text" icon="plus" @click="console.log('text')" />
      <TextButton
        label="Text"
        icon="plus"
        color="red"
        @click="console.log('text')"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
