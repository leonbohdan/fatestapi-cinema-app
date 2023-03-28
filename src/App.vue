<script setup>
import { useMoviesStore } from '@/stores/moviesStore.js';

const moviesStore = useMoviesStore();

moviesStore.getMoviesList();
</script>

<template>
  <header>
    Welcome
  </header>

  <main>
    Main
  </main>
</template>

<style scoped>
</style>
