<script setup>
import { ref, computed } from 'vue';
import { useMoviesStore } from '@/stores/moviesStore.js';

const moviesStore = useMoviesStore();

moviesStore.getMovieShowsList();

const headers = [
  {
    key: 'name',
    title: 'Name',
    sortable: false,
    filterable: true,
  }, {
    key: 'genre',
    title: 'Genre',
    sortable: false,
  },{
    key: 'description',
    title: 'Description',
    sortable: false,
  },
];

</script>

<template>
  <v-card
    :loading="moviesStore.movieShowsLoading"
    border
  >
    sessions
  </v-card>
</template>
