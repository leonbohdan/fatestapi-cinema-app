<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['update:model-value']);

const handleButtonClick = () => {
  emit('update:model-value', false);
};
</script>

<template>
  <div class="text-center">
    <v-dialog
      :model-value="modelValue"
      width="700px"
      persistent
    >
      <v-card>
        <v-card-title v-if="title" class="px-6">
          {{ title }}
        </v-card-title>

        <v-divider/>

        <v-card-text class="p-0">
          <slot/>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" block @click="handleButtonClick">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
