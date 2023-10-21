<template>
  <div className="">
    <div>
      <label class="text-sm">{{ label }}</label>
    </div>
    <textarea
      v-if="area"
      className="w-full border border-gray-200 rounded px-2 py-1"
      :type="type ?? 'text'"
      :value="modelValue"
      @input="onChange($event)"
    />
    <input
      v-else
      className="w-full border border-gray-200 rounded px-2 py-1"
      :type="type ?? 'text'"
      :value="modelValue"
      @input="onChange($event)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  type: { type: String, required: false },
  area: { type: Boolean, required: false },
  modelValue: { type: String },
});
const emit = defineEmits(["update:modelValue"]);

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<style scoped></style>
