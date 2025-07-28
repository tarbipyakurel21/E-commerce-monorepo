// endpoints for auth logic
import axiosInstance from './axiosInstance';
import { API } from '../constants/api';

//register the user
export const registerUser = (data) =>axiosInstance.post(API.AUTH.REGISTER, data);

//login
export const loginUser = (data) => axiosInstance.post(API.AUTH.LOGIN, data);

//logout
export const logoutUser = (token) =>
  axiosInstance.post(API.AUTH.LOGOUT, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

//refresh token
export const refreshToken = (refreshToken) =>
  axiosInstance.post(API.AUTH.REFRESH, { refreshToken });

//oauth success handling
export const handleOAuthSuccess = () =>
  axiosInstance.get(API.AUTH.OAUTH_SUCCESS);

