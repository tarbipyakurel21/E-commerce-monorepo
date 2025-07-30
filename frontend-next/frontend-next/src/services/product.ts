import axiosInstance from './axiosInstance';
import { API } from '../constants/api';


export const fetchProducts = (category?: string) => {
  const url = category ? `${API.PRODUCTS.ALL}?category=${category}` : API.PRODUCTS.ALL;
  return axiosInstance.get<Product[]>(url);
};

export const fetchProductById = (id: number) => 
  axiosInstance.get<Product>(API.PRODUCTS.SINGLE(id));

export const createProduct = (productData: Partial<Product>) =>
  axiosInstance.post<Product>(API.PRODUCTS.CREATE, productData);

export const updateProduct = (id: number, data: Partial<Product>) =>
  axiosInstance.put<Product>(API.PRODUCTS.UPDATE(id), data);

export const deleteProduct = (id: number) =>
  axiosInstance.delete<void>(API.PRODUCTS.DELETE(id));

export const searchProductsByNameAndCategory = (name: string, category: string) =>
  axiosInstance.get<Product[]>(API.PRODUCTS.FILTER, {
    params: { name, category },
  });

export const searchProducts = (name: string) =>
  axiosInstance.get<Product[]>(API.PRODUCTS.SEARCH(name));

// Product type
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
};
