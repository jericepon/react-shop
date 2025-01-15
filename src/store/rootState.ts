import { configureStore } from "@reduxjs/toolkit";
import Authentication from "./features/Auth";
import Product from "./features/Product";

const rootStore = configureStore({
  reducer: {
    product: Product,
    auth: Authentication
  },
});

export default {
  product: Product,
  auth: Authentication
};

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;