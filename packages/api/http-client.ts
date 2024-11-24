import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337',
  headers: {
    'x-ipy-http-client': 'ipy-http-client',
  },
});

export default api;
