import { getAxiosInstance } from '@app/api/baseApi';
import { AxiosResponse } from 'axios';

const loginEndpoint = '/token';
const getUserEndpoint = '/users/me';
const logoutEndpoint = '/api/auth/jwt/logout';

export const loginUser = (loginData: string): Promise<AxiosResponse> =>
  getAxiosInstance().post(loginEndpoint, loginData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });

export const getUser = (): Promise<AxiosResponse> => {
  return getAxiosInstance().get(getUserEndpoint);
};

export const logoutUser = (): Promise<AxiosResponse> =>
  getAxiosInstance().post(logoutEndpoint, '', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
