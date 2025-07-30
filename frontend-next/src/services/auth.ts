import axiosInstance from '@/services/axiosInstance';
import { API } from '@/constants/api';

export const registerUser = (data: RegisterRequest) =>
  axiosInstance.post<AuthResponse>(API.AUTH.REGISTER, data);

export const loginUser = (data: LoginRequest) =>
  axiosInstance.post<AuthResponse>(API.AUTH.LOGIN, data);

export const logoutUser = () =>
  axiosInstance.post<string>(API.AUTH.LOGOUT);
  

export const refreshToken = (refreshToken: string) =>
  axiosInstance.post<AuthResponse>(API.AUTH.REFRESH, { refreshToken });

export const handleOAuthSuccess = () =>
  axiosInstance.get<AuthResponse>(API.AUTH.OAUTH_SUCCESS);

export const validateUser = () =>
  axiosInstance.get<UserInfoResponse>('/auth/validate'); // cookies sent automatically

// types
export type RegisterRequest = {
  identifier: string;
  username: string;
  password: string;
};

export type LoginRequest = {
  identifier: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  message:string;
};

export type TokenRequest = {
  accessToken: string;
};

export type UserInfoResponse = {
  username: string;
  role:number;
};
