// request for cart.js
import axiosInstance from './axiosInstance';
import { API } from '../constants/api';

//get all carts
export const getCartAPI = () => axiosInstance.get(API.CART.GET);

//add to cart
export const addToCartAPI = (productId,quantity=1) => axiosInstance.post(API.CART.ADD,{productId,quantity});

//remove from cart
export const removeFromCartAPI = (itemId) => axiosInstance.delete(API.CART.REMOVE(itemId));
