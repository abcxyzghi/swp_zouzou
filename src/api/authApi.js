import { TOKEN_INFO } from '../constants';
import axiosClient from './axiosClient';

const authApi = {
  signUp: (params) => {
    const url = '/api/v1/auth/register';
    return axiosClient.post(url, params);
  },
  logout: (params) => {
    const url = '/api/v1/auth/logout';
    return axiosClient.post(url, params);
  },
  login: (params) => {
    const url = '/api/v1/auth/authenticate';
    return axiosClient.post(url, params);
  },
  refreshToken: (token) => {
    const params = {
      token,
    };
    const url = '/api/v1/auth/refresh-token';
    axiosClient.post(url, params).then((res) => {
      localStorage.setItem(TOKEN_INFO.accessToken, res.accessToken);
      localStorage.setItem(TOKEN_INFO.refreshToken, res.refreshToken);
    });
  },
};
export default authApi;
