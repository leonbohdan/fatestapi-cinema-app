export const MOVIE_CONSTANTS = Object.freeze({
  Action: 0,
  Adventures: 1,
  Comedy: 2,
  Drama: 3,
  Horror: 4,
  Westerns: 5,
});

export const MOVIE_CONSTANTS_CONFIG = Object.freeze({
  [MOVIE_CONSTANTS.Action]: {
    text: 'Action',
    value: 0,
  },
  [MOVIE_CONSTANTS.Adventures]: {
    text: 'Adventures',
    value: 1,
  },
  [MOVIE_CONSTANTS.Comedy]: {
    text: 'Comedy',
    value: 2,
  },
  [MOVIE_CONSTANTS.Drama]: {
    text: 'Drama',
    value: 3,
  },
  [MOVIE_CONSTANTS.Horror]: {
    text: 'Horror',
    value: 4,
  },
  [MOVIE_CONSTANTS.Westerns]: {
    text: 'Westerns',
    value: 5,
  },
});

export const MOVIE_GENRES_FILTER = Object.freeze([
  {
    title: 'Action',
    value: 0,
  },
  {
    title: 'Adventures',
    value: 1,
  },
  {
    title: 'Comedy',
    value: 2,
  },
  {
    title: 'Drama',
    value: 3,
  },
  {
    title: 'Horror',
    value: 4,
  },
  {
    title: 'Westerns',
    value: 5,
  },
]);
