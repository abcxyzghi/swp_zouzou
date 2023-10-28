import axios from 'axios';
import { TOKEN_INFO } from '../constants/index';
import authApi from './authApi';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
// const cookies = new Cookies();
const axiosClient = axios.create({
  // config credentials
  withCredentials: false,
  baseURL: process.env.REACT_APP_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    if (config?.headers == null) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    const url = config.url !== undefined ? config.url : '';
    // console.log('api call: ', url);
    const pathNoAuthen = ['/api/v1/auth/register', '/api/v1/auth/logout', '/api/v1/auth/authenticate'];
    if (!pathNoAuthen.includes(url)) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_INFO.accessToken)}`;
    }
    // Do something before request is sent
    return config;
  },
  async function (error) {
    // Do something with request error
    return await Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (err) {
    const config = err.config;
    console.log(err);
    if (err.response != null && err.response.status === 401) {
      console.log('ok');
      config._retry = true;
      try {
        const refreshToken = localStorage.getItem(TOKEN_INFO.refreshToken) || '';
        if (refreshToken !== '') {
          authApi.refreshToken(refreshToken);
        }
      } catch (err) {
        console.log(err);
        return await Promise.reject(err);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return await Promise.reject(err);
  },
);

export default axiosClient;
