import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getCartAPI,addToCartAPI,removeFromCartAPI,
  clearCartAPI,CartRequest,CartResponse
} from '@/services/cart';

interface CartState {
  data: CartResponse | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState = {
  data: null,
  status: 'idle',
};

export const fetchCart = createAsyncThunk<CartResponse>(
  'cart/fetchCart',
  async () => {
    const res = await getCartAPI();
    return res.data;
  }
);

export const addToCart = createAsyncThunk<CartResponse, CartRequest>(
  'cart/addToCart',
  async ({ productId, quantity }) => {
    const res = await addToCartAPI(productId, quantity);
    return res.data;
  }
);

export const removeFromCart = createAsyncThunk<CartResponse, number>(
  'cart/removeFromCart',
  async (productId) => {
    const res = await removeFromCartAPI(productId);
    return res.data;
  }
);

export const clearCart = createAsyncThunk<void>(
  'cart/clearCart',
  async () => {
    await clearCartAPI();
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(clearCart.fulfilled, (state) => {
        state.data = { userId: '', items: [], totalPrice: 0 };
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
