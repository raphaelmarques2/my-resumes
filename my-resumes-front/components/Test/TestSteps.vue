<template>
  <div>
    <div>StepItem</div>
    <div className="space-x-2">
      <StepItem
        label="Primeiro"
        icon="check"
        :border="true"
        :selected="false"
      />
      <StepSeparator />
      <StepItem
        label="Segundo"
        icon="document"
        :border="true"
        :selected="true"
      />
      <StepSeparator />
      <StepItem
        label="Terceiro"
        icon="download"
        :border="false"
        :selected="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
