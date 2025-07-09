// send request to product.js
import axiosInstance from './axiosInstance';
import { API } from '../constants/api';

export const fetchProducts = (category) => {
  const url = category ? `${API.PRODUCTS.ALL}?category=${category}` : API.PRODUCTS.ALL;
  return axiosInstance.get(url);
};

export const fetchProductById = (id) => axiosInstance.get(API.PRODUCTS.SINGLE(id));

export const createProduct = (productData, token) =>
  axiosInstance.post(API.PRODUCTS.CREATE, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProduct = (id, data, token) =>
  axiosInstance.put(API.PRODUCTS.UPDATE(id), data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProduct = (id, token) =>
  axiosInstance.delete(API.PRODUCTS.DELETE(id), {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const searchProductsByNameAndCategory = (name, category) => {
    return axiosInstance.get(API.PRODUCTS.FILTER, {
      params: { name, category },
    });
  };
  

export const searchProducts = (name) => axiosInstance.get(API.PRODUCTS.SEARCH(name));
