import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/authSlice";
import { apiSlice } from "./services/apiSlice";
import cartReducer from "@/app/features/cartSlice";
import wishlistReducer from "@/app/features/wishlistSlice";

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "api/executeQuery/pending",
            "api/executeQuery/fulfilled",
            "api/executeQuery/rejected",
          ],
          ignoredActionPaths: [
            "meta.baseQueryMeta.request",
            "meta.baseQueryMeta.response",
          ],
          ignoredPaths: ["api.queries", "api.mutations"],
        },
      }).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Default store for client-only usage
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
