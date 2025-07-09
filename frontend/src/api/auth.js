// endpoints for auth logic
import axiosInstance from './axiosInstance';
import { API } from '../constants/api';

export const registerUser = (data) => axiosInstance.post(API.AUTH.REGISTER, data);
export const loginUser = (data) => axiosInstance.post(API.AUTH.LOGIN, data);
export const logoutUser = (token) =>
  axiosInstance.post(API.AUTH.LOGOUT, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const refreshToken = (refreshToken) =>
  axiosInstance.post(API.AUTH.REFRESH, { refreshToken });

export const handleOAuthSuccess = () =>
  axiosInstance.get(API.AUTH.OAUTH_SUCCESS);

