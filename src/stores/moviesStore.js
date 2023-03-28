import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import {
  getMovies,
} from '@/api/moviesApi.js';

export const useMoviesStore = defineStore('moviesStore', () => {
  const movies = ref([]);
  const moviesLoading = ref(false);

  // const doubleCount = computed(() => count.value * 2);

  async function getMoviesList() {
    try {
      moviesLoading.value = true;
      const { data } = await getMovies();

      movies.value = data.data;
    } finally {
      moviesLoading.value = false;
    }
  }

  return { getMoviesList, moviesLoading, movies };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMoviesStore, import.meta.hot));
