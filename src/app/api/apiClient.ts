import axios from 'redaxios';

const apiClient = axios.create({
  baseURL: location.protocol + '//' + location.host
});

export { apiClient };
