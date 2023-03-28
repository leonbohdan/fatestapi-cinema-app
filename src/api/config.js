import axios from 'axios';

const baseApiUrl = 'https://cinema-api-test.y-media.io/v1';

export const apiClient = axios.create({
  baseURL: baseApiUrl,
});
