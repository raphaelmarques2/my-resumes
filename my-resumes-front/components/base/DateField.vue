<template>
  <div>
    <div>
      <label class="text-sm">{{ label }}</label>
    </div>
    <input
      class="w-full border border-gray-200 rounded px-2 py-1"
      :value="value"
      type="date"
      @input="onChange($event)"
    />
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

const props = defineProps<{
  label: string;
  modelValue?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const value = computed(() => {
  if (!props.modelValue) return "";
  return moment(props.modelValue).format("yyyy-MM-DD");
});

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  if (value) {
    const date = moment(value).toISOString();
    emit("update:modelValue", date);
  } else {
    emit("update:modelValue", undefined);
  }
}
</script>

<style scoped></style>
