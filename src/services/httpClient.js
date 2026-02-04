import axios from 'axios';

const baseURL = import.meta.env.VITE_HP_API_BASE_URL;

if (!baseURL) {
  throw new Error('VITE_HP_API_BASE_URL is not defined');
}

export const httpClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});
