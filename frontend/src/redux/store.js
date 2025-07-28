import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';


// create the store
// cart managed by cartReducer from cartSlice
export const store=configureStore({
    reducer:{
        cart:cartReducer,
    },
});



