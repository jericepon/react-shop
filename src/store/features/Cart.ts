import API from "@/api";
import { AddedToCartData } from "@/models/Cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
  // addedToCart: AddedToCartData[];
  loading: boolean;
}

export const addNewCart = createAsyncThunk('cart/add', async (addedToCart: AddedToCartData) => {
  const response = await API.post(`/carts/add`, addedToCart);
  return Promise.all([
    response,
    new Promise((resolve) => setTimeout(resolve, 1000))
  ]).then(([response]) => {
    return response.data.products;
  });
});

const initialState: CartState = {
  // addedToCart: [],
  loading: true,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

  }
});
// export const { resetCartState } = cart.actions;
export default cart.reducer;