import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { InitalState } from "../../interfaces/interfaces";
import { login, logout, register ,verify} from "./AuthAction";

// Define a type for the slice state
interface AuthState extends InitalState {
  isAdmin?: boolean;
  userId: string | null | undefined;
  isVerified?: boolean;
}

// Define the initial state using that type
const initialAuthState: AuthState = {
  isAdmin: false,
  userId: null,
  isError: false,
  isLoading: false,
  message: "",
  isVerified: false,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialAuthState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(register.fulfilled, (state: AuthState, action) => {
        console.log(action.payload);
        
        state.isLoading = false;
        state.isError = false;
        state.userId = action.payload.userId;
        state.isAdmin = action.payload?.isAdmin;
        state.message = null;
      })

      .addCase(register.pending, (state: AuthState) => {
        state.isLoading = true;
        state.isError = false;
        state.userId = null;
        state.isAdmin = false;
        state.message = null;
      })

      .addCase(register.rejected, (state: AuthState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userId = null;
        state.isAdmin = false;
        state.message = action.error as string;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userId = action.payload.id;
        state.isAdmin = false;
        state.message = action.payload.message as string;
        state.isVerified = action.payload.isVerified;
      })

      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.userId = null;
        state.isAdmin = false;
        state.message = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userId = null;
        state.isAdmin = false;
        state.message = action.error as string;
      })

      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userId = null;
        state.isAdmin = false;
        state.message = action.error as string;
        state.isVerified = false;
      })

      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.userId = null;
        state.isAdmin = false;
        state.message = null;
        state.isVerified = false;
      })

      .addCase(logout.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = false;
        state.userId = null;
        state.isAdmin = false;
        state.isVerified = false;
        state.message = action.payload.data.message as string;
      })

      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userId = null;
        state.isAdmin = false;
        state.message = action.error as string;
        state.isVerified = false;
      })

      .addCase(verify.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.userId = null;
        state.isAdmin = false;
        state.message = null;
        state.isVerified = false;
      })

      .addCase(verify.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = false;
        state.userId = action.meta.arg.userId;
        state.isAdmin = false;
        state.isVerified = action.payload.data.verified;
        state.message = action.payload.data.message as string;
      });
  },
});

export const getUserId = (state: any) => state.auth.userId;
export const getIsVerified = (state: any) => state.auth.isVerified;
export const getIsAuthLoading = (state:any) => state.auth.isLoading;
 
export const authReducer = authSlice.reducer;
