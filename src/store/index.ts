import { configureStore } from "@reduxjs/toolkit";
import Product from "./features/Product";

export const store = configureStore({
  reducer: {
    product: Product
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;