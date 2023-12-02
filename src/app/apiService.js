import axios from 'axios';
import { BASE_URL } from './config';

const apiService = axiost.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  request => {
    console.log('Start Request', request);
    return request;
  },
  function (error) {
    console.log('REQUEST ERROR', { error });
    return Promise.reject(error);
  }
);
