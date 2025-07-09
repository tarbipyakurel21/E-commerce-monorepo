// request for cart.js
import axiosInstance from './axiosInstance';
import { API } from '../constants/api';

export const getCart = () => axiosInstance.get(API.CART.GET);

export const addToCart = (productId,quantity=1) => axiosInstance.post(API.CART.ADD,{productId,quantity});

export const removeFromCart = (itemId) => axiosInstance.delete(API.CART.REMOVE(itemId));
