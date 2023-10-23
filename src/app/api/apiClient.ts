import axios from 'axios';

axios.defaults.baseURL = location.protocol + '//' + location.host;

const apiClient = axios;

export { apiClient };
