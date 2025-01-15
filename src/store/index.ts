import { configureStore } from "@reduxjs/toolkit";
import Product from "./features/Product";
import Authentication from "./features/Auth";

export const store = configureStore({
  reducer: {
    product: Product,
    auth: Authentication
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;