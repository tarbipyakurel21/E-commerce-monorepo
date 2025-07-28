import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { getCartAPI, addToCartAPI, removeFromCartAPI } from "../api/cart";

//intialize the state status as idle(nothing happening) and error null
const initialState = {
  items: [],
  status:'idle',
  error:null,
};

// fetch from api
export const fetchCart=createAsyncThunk("cart/fetchCart",async(userId)=>{
  const res=await getCartAPI(userId);
  return res.data;
});
// add from api
export const addToCart = createAsyncThunk("cart/addToCart", async (item) => {
  const res = await addToCartAPI(item);
  return res.data;
});
//remove from cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (itemId) => {
  await removeFromCartAPI(itemId);
  return itemId;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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
 extraReducers: (builder) => {
    // Handle fetchCart lifecycle
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle addToCart lifecycle
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const existing = state.items.find(item => item.productId === action.payload.productId);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle removeFromCart lifecycle
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.productId !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearCart, subtractFromCart } = cartSlice.actions;
export default cartSlice.reducer;
