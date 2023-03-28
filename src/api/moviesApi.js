import { apiClient } from '@/api/config.js';

export const getMovies = (params) => apiClient.get('/movies', { params });

export const getMovieShows = (params) => apiClient.get('/movieShows', { params });

export const checkFreePlaces = (params) => apiClient.get('/showPlaces', { params });

export const bookPlace = (data) => apiClient.post('/bookPlace', data);
