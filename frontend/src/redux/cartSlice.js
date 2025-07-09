import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find(item => item.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    setCartItems(state, action) {
      state.items = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
    subtractFromCart(state, action) {
      const item = state.items.find(i => i.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(i => i.productId !== action.payload);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartItems,
  clearCart,
  subtractFromCart
} = cartSlice.actions;

export default cartSlice.reducer;
