<script setup>
import { useMoviesStore } from '@/stores/moviesStore.js';

const moviesStore = useMoviesStore();

moviesStore.getMoviesList();
moviesStore.getMovieShowsList();
moviesStore.getMovieShow(60);
moviesStore.checkFree();
moviesStore.bookPlaceTicket();
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
