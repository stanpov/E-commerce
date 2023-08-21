import { ChangePasswordData } from '../../interfaces/interfaces';
import { changePassword } from './UserServices';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeMyPassword = createAsyncThunk(
    'user/ChangePassword',
    async (userData: ChangePasswordData, thunkAPI) => {
        try {
            return changePassword(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error });
        }
    }
);