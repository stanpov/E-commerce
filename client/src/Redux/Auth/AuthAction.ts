import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "./AuthService";
import { UserDataLogin, UserDataRegister,UserVerifyData } from "../../interfaces/interfaces";

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

export const logout = createAsyncThunk(
    "auth/Logout",
    async (undefined, thunkAPI) => {
        try {
            return AuthService.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error });
        }
    }
);

export const verify = createAsyncThunk(
    'auth/Verify',
    async (UserData:UserVerifyData, thunkAPI) => {
        try {
            return AuthService.verify(UserData);
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error });
        }
    }
)