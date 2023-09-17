import { ChangePasswordData, ConfirmPasswordData, ResetPasswordData, UpdateUserProfile, UserId } from '../../interfaces/interfaces';
import { changePassword, confirmPassword, getUserInformation, resetPassword, updateUserInformation } from './UserServices';
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

export const userInformation = createAsyncThunk('user/GetInformation', async( userData:UserId, thunkAPI)=>{
    try {
        return getUserInformation(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue({ message: error });
    }
});

export const updateProfile = createAsyncThunk('user/UpdateProfile', async( data:UpdateUserProfile, thunkAPI)=>{
    try {
        return updateUserInformation(data);
    } catch (error) {
        return thunkAPI.rejectWithValue({ message: error });
    }
});