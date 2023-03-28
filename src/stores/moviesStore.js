import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import {
  getMovies,
  getMovieShows,
  checkFreePlaces,
  bookPlace,
} from '@/api/moviesApi.js';

export const useMoviesStore = defineStore('moviesStore', () => {
  const movies = ref([]);
  const moviesLoading = ref(false);
  const moviesParams = ref({
    name: '',
    genres: '',
  });

  const movie = ref(null);
  const movieLoading = ref(false);

  const movieShows = ref([]);
  const movieShowsLoading = ref(false);

  const movieShow = ref(null);
  const movieShowLoading = ref(false);

  const checkFreePlacesLoading = ref(false);
  const checkFreePlacesParams = ref({
    movie_id: '61',
    daytime: '10:50',
    showdate: '2021-06-27',
  });

  const bookPlaceLoading = ref(false);
  const bookPlaceParams = ref({
    movie_id: 61,
    row: 9,
    seat: 18,
    showdate: '2021-06-27',
    daytime: '10:50',
  });

  // const doubleCount = computed(() => count.value * 2);

  async function getMoviesList() {
    try {
      moviesLoading.value = true;
      const { data } = await getMovies(moviesParams.value);

      movies.value = data.data;
    } finally {
      moviesLoading.value = false;
    }
  }

  async function getMovie(movie_id) {
    try {
      movieLoading.value = true;
      const { data } = await getMovies({ movie_id });

      movie.value = data.data;
    } finally {
      movieLoading.value = false;
    }
  }

  async function getMovieShowsList() {
    try {
      movieShowsLoading.value = true;
      const { data } = await getMovieShows();

      movieShows.value = data.data;
    } finally {
      movieShowsLoading.value = false;
    }
  }

  async function getMovieShow(movie_id) {
    try {
      movieShowLoading.value = true;
      const { data } = await getMovieShows({ movie_id });

      movieShow.value = data.data;
    } finally {
      movieShowLoading.value = false;
    }
  }

  async function checkFree() {
    try {
      checkFreePlacesLoading.value = true;
      const { data } = await checkFreePlaces(checkFreePlacesParams.value);

      return data;
    } finally {
      checkFreePlacesLoading.value = false;
    }
  }

  async function bookPlaceTicket() {
    try {
      bookPlaceLoading.value = true;
      const { data, headers } = await bookPlace(bookPlaceParams.value);

      console.log('bookPlaceTicket headers', headers);
      console.log('bookPlaceTicket data', data);
    } finally {
      bookPlaceLoading.value = false;
    }
  }

  return {
    getMovie,
    getMoviesList,
    getMovieShowsList,
    getMovieShow,
    checkFree,
    bookPlaceTicket,
    moviesLoading,
    movieLoading,
    movies,
    movie,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMoviesStore, import.meta.hot));
