import axiosInstance from './axiosInstance';
import { API } from '../constants/api';


export const getCartAPI = () =>
  axiosInstance.get<CartResponse>(API.CART.GET);

export const addToCartAPI = (productId: number, quantity = 1) => {
  const data: CartRequest = { productId, quantity };
  return axiosInstance.post<CartResponse>(API.CART.ADD, data);
};

export const removeFromCartAPI = (productId: number) =>
  axiosInstance.delete<CartResponse>(API.CART.REMOVE(productId));

export const clearCartAPI = () =>
  axiosInstance.delete<void>(API.CART.CLEAR);

// type
// types/cart.ts

export type CartItemDto = {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
};

export type CartResponse = {
  userId: string;
  items: CartItemDto[];
  totalPrice: number;
};

export type CartRequest = {
  productId: number;
  quantity: number;
};

