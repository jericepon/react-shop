import API from "@/api";
import { Category, Product } from "@/models/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductState {
  list: Product[];
  loading: boolean;
}

export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
  const response = await API.get("/products?limit=10");
  return Promise.all([
    response,
    new Promise((resolve) => setTimeout(resolve, 1000))
  ]).then(([response]) => {
    return response.data.products;
  });
});

export const searchProduct = createAsyncThunk('product/searchProduct', async (searchTerm: string) => {
  const response = await API.get(`/products/search?q=${searchTerm}&limit=10`);
  return Promise.all([
    response,
    new Promise((resolve) => setTimeout(resolve, 1000))
  ]).then(([response]) => {
    return response.data.products;
  });
});

export const searchByCategory = createAsyncThunk('product/searchByCategory', async (category: Category) => {
  const response = await API.get(`/products/category/${category.slug}`);
  return Promise.all([
    response,
    new Promise((resolve) => setTimeout(resolve, 1000))
  ]).then(([response]) => {
    return response.data.products;
  });
})


const initialState: ProductState = {
  list: [],
  loading: true,
};

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: (state) => { state.list = []; state.loading = true; }
  },
  extraReducers: (builder) => {
    // getAllProducts
    builder.addCase(getAllProducts.pending, (state) => { state.loading = true; })
      .addCase(getAllProducts.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(getAllProducts.rejected, (state) => { state.loading = false; });
    // searchProduct
    builder.addCase(searchProduct.pending, (state) => { state.loading = true; })
      .addCase(searchProduct.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(searchProduct.rejected, (state) => { state.loading = false; });
    // searchByCategory
    builder.addCase(searchByCategory.pending, (state) => { state.loading = true; })
      .addCase(searchByCategory.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(searchByCategory.rejected, (state) => { state.loading = false; });
  }
});
export const { resetProductState } = product.actions;
export default product.reducer;