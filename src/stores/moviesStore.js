import { defineStore, acceptHMRUpdate } from 'pinia';
import { debounce } from 'lodash-es';
import {
  getMovies,
  getMovieShows,
  checkFreePlaces,
  bookPlace,
} from '@/api/moviesApi.js';

const DEBOUNCE_DELAY = 400;

export const useMoviesStore = defineStore('moviesStore', {
  state: () => ({
    movies: [],
    moviesLoading: false,
    moviesParams: {
      name: '',
      genres: '',
    },

    movie: null,
    movieLoading: false,

    movieShows: [],
    movieShowsLoading: false,

    movieShow: null,
    movieShowLoading: false,

    checkFreePlacesLoading: false,
    checkFreePlacesParams: {
      movie_id: null,
      daytime: '',
      showdate: '',
    },

    bookPlaceLoading: false,
    bookPlaceParams: {
      movie_id: null,
      row: null,
      seat: null,
      showdate: '',
      daytime: '',
    },
  }),

  actions: {
    getMoviesList: debounce(async function () {
      this.moviesLoading = true;

      try {
        const { data } = await getMovies(this.moviesParams);

        this.movies = data.data;
      } finally {
        this.moviesLoading = false;
      }
    }, DEBOUNCE_DELAY),

    async setMoviesParams(params) {
      this.moviesParams = {
        ...this.moviesParams,
        ...params,
      };
    },

    async getMovie(movie_id) {
      this.movieLoading = true;

      try {
        const { data } = await getMovies({ movie_id });

        this.movie = data.data;
      } finally {
        this.movieLoading = false;
      }
    },

    async getMovieShowsList() {
      this.movieShowsLoading = true;

      try {
        const { data } = await getMovieShows();

        this.movieShows = data.data;
      } finally {
        this.movieShowsLoading = false;
      }
    },

    async getMovieShow(movie_id) {
      this.movieShowLoading = true;

      try {
        const { data } = await getMovieShows({ movie_id });

        this.movieShow = data.data;

        return data.data;
      } finally {
        this.movieShowLoading = false;
      }
    },

    async checkFree() {
      this.checkFreePlacesLoading = true;

      try {
        const { data } = await checkFreePlaces(this.checkFreePlacesParams);

        return data.data;
      } finally {
        this.checkFreePlacesLoading = false;
      }
    },

    async setPlacesParams(params) {
      this.checkFreePlacesParams = {
        ...this.checkFreePlacesParams,
        ...params,
      };
    },

    async bookPlaceTicket() {
      this.bookPlaceLoading = true;

      try {
        const { data } = await bookPlace(this.bookPlaceParams);

        return data.data;
      } finally {
        this.bookPlaceLoading = false;
      }
    },

    async setBookPlaceParams(params) {
      this.bookPlaceParams = {
        ...this.bookPlaceParams,
        ...params,
      };
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMoviesStore, import.meta.hot));
