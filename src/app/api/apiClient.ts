import axios from 'redaxios';

const apiClient = axios.create({
  baseURL: 'http://' + location.hostname + ':8000',
});

export { apiClient };
