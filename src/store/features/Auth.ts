import API from "@/api";
import { toast } from "@/hooks/use-toast";
import { AuthInfo, LoginData } from "@/models/Auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  authInfo: AuthInfo;
  isAuthenticated: boolean;
  hasError: boolean;
  loading: boolean;
}

export const login = createAsyncThunk('auth/login', async (loginData: LoginData) => {
  const response = await API.post("/auth/login", loginData);
  return response.data;
});

const initialState = {
  authInfo: {} as AuthInfo,
  isAuthenticated: false,
  hasError: false,
  loading: false
} as AuthState;

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.authInfo = {} as AuthInfo;
      state.isAuthenticated = false;
      state.hasError = false;
      state.loading = false;
      window.location.href = '/login';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authInfo = action.payload;
        state.isAuthenticated = true;
        state.hasError = false;
        window.location.href = "/";
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.hasError = true;
        toast({ variant: "destructive", description: "Invalid credentials. Please try again.", });
      });
  }
});

export const { logout } = auth.actions;
export default auth.reducer;