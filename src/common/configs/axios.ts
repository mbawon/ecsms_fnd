import axios from 'axios';

export const baseURL = "http://10.233.217.217/"

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
