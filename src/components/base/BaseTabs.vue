<script setup>
import { ref } from 'vue';
import MoviesList from '@/components/MoviesList.vue';
import SessionsList from '@/components/SessionsList.vue';

const tab = ref('todos');

const items = [
  {
    title: 'Movies',
    value: 'movies',
  },
  {
    title: 'Sessions',
    value: 'sessions',
  },
];
</script>

<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab
        v-for="(item, i) in items"
        :key="i"
        :value="item.value"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="movies">
          <MoviesList/>
        </v-window-item>

        <v-window-item value="sessions">
          <SessionsList/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
