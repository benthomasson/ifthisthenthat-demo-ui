import axios from 'redaxios';

const apiClient = axios.create({
  baseURL: 'http://' + location.hostname + ':' + location.port
});

export { apiClient };
