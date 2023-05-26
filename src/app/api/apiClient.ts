import axios from 'redaxios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
});

export { apiClient };
