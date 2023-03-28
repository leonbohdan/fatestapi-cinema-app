import { apiClient } from '@/api/config.js';

export const getMovies = (params) => apiClient.get('/movies', { params });
// ?movie_id={id}&name={name}&genres={genres}

export const getMovieShows = (params) => apiClient.get('/movieShows', { params });
// ?movie_id={id}

export const checkFreePlaces = (params) => apiClient.get('/showPlaces', { params });
// ?movie_id={id}&daytime={daytime}&showdate={showdate}

export const bookPlace = (data) => apiClient.post('/bookPlace', data);
