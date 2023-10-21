<template>
  <div>
    <div>TabItem</div>
    <div className="space-x-4">
      <TabItem label="Primeiro" :selected="false" />
      <TabItem label="Segundo" :selected="true" />
      <TabItem label="Terceiro" :selected="false" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
