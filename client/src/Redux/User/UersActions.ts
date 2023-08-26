import { ChangePasswordData, ConfirmPasswordData, ResetPasswordData } from '../../interfaces/interfaces';
import { changePassword, confirmPassword, resetPassword } from './UserServices';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeMyPassword = createAsyncThunk('user/ChangePassword', async (userData: ChangePasswordData, thunkAPI) => {
    try {
        return changePassword(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue({ message: error });
    }
});

export const confirmMyPassword = createAsyncThunk('user/ConfirmPassword', async (userData: ConfirmPasswordData, thunkAPI) => {
    try {
        return confirmPassword(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue({ message: error });
    }
});

export const resetMyPassword = createAsyncThunk('user/ResetPassword', async (userData: ResetPasswordData, thunkAPI) => {
    try {
        return resetPassword(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue({ message: error });
    }
});