import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { InitalState } from "../../interfaces/interfaces";
import { login, register } from "./AuthAction";

// Define a type for the slice state
interface AuthState extends InitalState {
  isAdmin?: boolean;
  userId: string | null | undefined;
}

// Define the initial state using that type
const initialAuthState: AuthState = {
  isAdmin: false,
  userId: null,
  isError: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialAuthState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(register.fulfilled, (state: AuthState, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userId = action.payload?._id;
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
      });
  },
});

export const getUserId = (state:any) => state.auth.userId;

export const authReducer = authSlice.reducer;
