<script setup>
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <v-text-field
    :model-value="value"
    placeholder="Search"
    variant="outlined"
    density="compact"
    hide-details
    prepend-inner-icon="mdi-magnify"
    single-line
  />
</template>
