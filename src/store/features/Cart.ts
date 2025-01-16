import API from "@/api";
import { toast } from "@/hooks/use-toast";
import { AddedToCartData, CartItem } from "@/models/Cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
  cartId: number;
  addedToCartData: AddedToCartData;
  addToCartPending: boolean;
  cartList: CartItem[];
  loading: boolean;
}

export const addNewCart = createAsyncThunk('cart/add', async (addedToCartPayload: AddedToCartData, { dispatch }) => {
  const response = await API.post(`/carts/add`, addedToCartPayload);
  return Promise.all([
    response,
    new Promise((resolve) => setTimeout(resolve, 1000))
  ]).then(([response]) => {
    Promise.resolve(dispatch(cart.actions.updateCartList(response.data.products))).then(() => {
      // dispatch(getCartByUser(addedToCartPayload.userId));
    });
    return response.data.products;
  });
});

export const getCartByUser = createAsyncThunk('cart/getCartByUser', async (cartId: number) => {
  const response = await API.get(`/cart/user/${cartId}`);
  return Promise.all([
    response,
    new Promise((resolve) => setTimeout(resolve, 1000))
  ]).then(([response]) => {
    return response.data.products;
  });
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (payload: { userId: number, product: { id: number, quantity: number } }, { dispatch, getState }) => {
    const state = getState() as { cart: CartState };
    const updatedCartData = {
      ...state.cart.addedToCartData,
      userId: payload.userId,
      products: [...state.cart.addedToCartData.products, payload.product]
    };
    await dispatch(addNewCart(updatedCartData));
    return updatedCartData;
  }
);


const initialState: CartState = {
  cartId: 0,
  addedToCartData: {
    userId: 0,
    products: []
  },
  addToCartPending: false,
  cartList: [],
  loading: true,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartList: (state, action) => {
      state.cartList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addNewCart.pending, (state) => {
      state.addToCartPending = true;
    }).addCase(addNewCart.fulfilled, (state, action) => {
      state.addedToCartData.products = action.payload;
      state.addToCartPending = false;
    }).addCase(addNewCart.rejected, (state) => {
      toast({ variant: "destructive", title: "Error: Cart Update Failed", description: "Oops! Something went wrong. Even the best of us have bad days!" });
      state.addToCartPending = false;
    });
  }
});
export default cart.reducer;