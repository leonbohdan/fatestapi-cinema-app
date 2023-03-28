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
      movie_id: 61,
      daytime: '10:50',
      showdate: '2021-06-27',
    },

    bookPlaceLoading: false,
    bookPlaceParams: {
      movie_id: 61,
      row: 9,
      seat: 18,
      showdate: '2021-06-27',
      daytime: '10:50',
    },
  }),

  actions: {
    getMoviesList: debounce(async function () {
      try {
        this.moviesLoading = true;
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
      try {
        this.movieLoading = true;
        const { data } = await getMovies({ movie_id });

        this.movie = data.data;
      } finally {
        this.movieLoading = false;
      }
    },

    async getMovieShowsList() {
      try {
        this.this.movieShowsLoading = true;
        const { data } = await getMovieShows();

        this.this.movieShows = data.data;
      } finally {
        this.this.movieShowsLoading = false;
      }
    },

    async getMovieShow(movie_id) {
      try {
        this.movieShowLoading = true;
        const { data } = await getMovieShows({ movie_id });

        this.movieShow = data.data;
      } finally {
        this.movieShowLoading = false;
      }
    },

    async checkFree() {
      try {
        this.checkFreePlacesLoading = true;
        const { data } = await checkFreePlaces(this.checkFreePlacesParams);

        return data;
      } finally {
        this.checkFreePlacesLoading = false;
      }
    },

    async bookPlaceTicket() {
      try {
        this.bookPlaceLoading = true;
        const { data, headers } = await bookPlace(this.bookPlaceParams);

        console.log('bookPlaceTicket headers', headers);
        console.log('bookPlaceTicket data', data);
      } finally {
        this.bookPlaceLoading = false;
      }
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMoviesStore, import.meta.hot));
