import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "./AuthService";
import { UserDataLogin, UserDataRegister } from "../../interfaces/interfaces";

export const register = createAsyncThunk(
  "auth/Register",
  async (userData: UserDataRegister, thunkAPI) => {
    try {
      return AuthService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error });
    }
  }
);

export const login = createAsyncThunk(
  "auth/Login",
  async (UserData: UserDataLogin, thunkAPI) => {
    try {
      return AuthService.login(UserData);
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error });
    }
  }
);
