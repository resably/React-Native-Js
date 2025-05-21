import axios from 'axios';

const baseURL = 'http://10.0.2.2:8080/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;