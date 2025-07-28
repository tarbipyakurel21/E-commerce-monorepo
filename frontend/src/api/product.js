// send request to product.js
import axiosInstance from './axiosInstance';
import { API } from '../constants/api';

//fetch all products based on category
export const fetchProducts = (category) => {
  const url = category ? `${API.PRODUCTS.ALL}?category=${category}` : API.PRODUCTS.ALL;
  return axiosInstance.get(url);
};

//fetch products with id
export const fetchProductById = (id) => axiosInstance.get(API.PRODUCTS.SINGLE(id));

//add product
export const createProduct = (productData) =>
  axiosInstance.post(API.PRODUCTS.CREATE, productData);

//update
export const updateProduct = (id, data) =>
  axiosInstance.put(API.PRODUCTS.UPDATE(id), data);

//delete
export const deleteProduct = (id) =>
  axiosInstance.delete(API.PRODUCTS.DELETE(id));

//search by name and category both
export const searchProductsByNameAndCategory = (name, category) => {
    return axiosInstance.get(API.PRODUCTS.FILTER, {
      params: { name, category },
    });
  };
  
//search product by name
export const searchProducts = (name) => axiosInstance.get(API.PRODUCTS.SEARCH(name));
