import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByNameAndCategory,
} from '../api/product'; // your custom API functions

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async (category = "") => {
    try {
      setStatus("loading");
      const res = await fetchProducts(category);
      setProducts(res.data);
      setStatus("succeeded");
    } catch (err) {
      setError(err.message);
      setStatus("failed");
    }
  }, []);

  const searchProducts = useCallback(async (name, category = "") => {
    try {
      setStatus("loading");
      const res = await searchProductsByNameAndCategory(name, category);
      setProducts(res.data);
      setStatus("succeeded");
    } catch (err) {
      setError(err.message);
      setStatus("failed");
    }
  }, []);

  const loadProduct = async (id) => {
    try {
      const res = await fetchProductById(id);
      setProductDetails(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addProduct = async (productData, token) => {
    return createProduct(productData, token);
  };

  const editProduct = async (id, data, token) => {
    return updateProduct(id, data, token);
  };

  const removeProduct = async (id, token) => {
    return deleteProduct(id, token);
  };

  return (
    <ProductContext.Provider value={{
      products,
      productDetails,
      status,
      error,
      loadProducts,
      loadProduct,
      searchProducts,
      addProduct,
      editProduct,
      removeProduct,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
