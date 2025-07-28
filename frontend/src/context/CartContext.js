import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, addToCart, removeFromCart, clearCart, subtractFromCart } from '../redux/cartSlice';
import { useCallback } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.cart);

 const fetchUserCart = useCallback(async () => {
  try {
    await dispatch(fetchCart()).unwrap();
  } catch (err) {
    console.error("fetchUserCart error:", err);
    throw err;
  }
}, [dispatch]);

  const addItem = (item) => dispatch(addToCart(item));
  const removeItem = (itemId) => dispatch(removeFromCart(itemId));
  const subtractItem = (itemId) => dispatch(subtractFromCart(itemId));
  const clearAll = () => dispatch(clearCart());

  return (
    <CartContext.Provider value={{
      items,
      status,
      error,
      fetchUserCart,
      addItem,
      removeItem,
      subtractItem,
      clearAll,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
