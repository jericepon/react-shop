import { configureStore } from "@reduxjs/toolkit";
import Authentication from "./features/Auth";
import Product from "./features/Product";
import Cart from "./features/Cart";

const rootStore = configureStore({
  reducer: {
    product: Product,
    auth: Authentication,
    cart: Cart
  },
});

export default {
  product: Product,
  auth: Authentication,
  cart: Cart
};

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;