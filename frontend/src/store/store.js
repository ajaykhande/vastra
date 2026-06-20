import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducers from "./authSlice";
import bagReducers from "./bagSlice";
import orderReducers from "./orderSlice";
import wishlistReducers from "./wishlistSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducers,
    bag: bagReducers,
    orders: orderReducers,
    wishlist: wishlistReducers,
  },
});

export default store;
