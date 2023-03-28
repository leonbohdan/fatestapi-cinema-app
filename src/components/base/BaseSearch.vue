<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['update:model-value']);
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    placeholder="Search"
    variant="outlined"
    density="compact"
    hide-details
    prepend-inner-icon="mdi-magnify"
    single-line
    @input="emits('update:model-value', $event.target.value)"
  />
</template>
