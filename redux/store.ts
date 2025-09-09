
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/authSlice";
import { apiSlice } from "./services/apiSlice";
import cartReducer from "@/app/features/cartSlice";
import wishlistReducer from "@/app/features/wishlistSlice";
import userReducer from "@/app/features/userSlice";

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  user: userReducer,
};


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
