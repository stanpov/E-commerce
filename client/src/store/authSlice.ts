import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";

// Define a type for the slice state
interface AuthState {
  user: string | null;
  isAdmin: boolean;
  userId: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  isAdmin: false,
  userId: null,
};

export const authSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isAdmin = action.payload.isAdmin;
      state.user = action.payload.user;
      state.userId = action.payload.userId;
    },
    logOut: (state, action) => {
      return initialState;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export const authReducer = authSlice.reducer;
