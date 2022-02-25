import axios from 'axios';
import { retrieveUserToken } from './userTokenStorage';

const baseURL = '';

const instance = axios.create({
  baseURL,
});

const isRequiredAccessToken = (url: string) => {
  if (url === 'users/signin/') return false;
  return true;
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    if (isRequiredAccessToken(config.url)) {
      const accessToken = retrieveUserToken('access');
      if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
