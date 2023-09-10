import { createSlice } from '@reduxjs/toolkit';
import { InitalState } from '../../interfaces/interfaces'
import { changeMyPassword, confirmMyPassword, resetMyPassword, updateProfile, userInformation } from './UserActions';

interface UserState extends InitalState {
    deliveryAddress?: string;
    phoneNumber?: number | null;
    userImage?: string;
    userName?: string;
    email?:string;
}

const initialUserState: UserState = {
    message: '',
    isError: false,
    isLoading: false,
    userImage: '',
    userName: '',
    phoneNumber: null,
    deliveryAddress: '',
    email:'',
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {},
    extraReducers(builder) {
        builder

            .addCase(changeMyPassword.fulfilled, (state: UserState, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = action.payload.data.message;
            })

            .addCase(changeMyPassword.pending, (state: UserState) => {
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })

            .addCase(changeMyPassword.rejected, (state: UserState, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.error as string;
            })

            .addCase(confirmMyPassword.fulfilled, (state: UserState, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = action.payload.data.message;
            })

            .addCase(confirmMyPassword.pending, (state: UserState) => {
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })

            .addCase(confirmMyPassword.rejected, (state: UserState, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.error as string;
            })

            .addCase(resetMyPassword.fulfilled, (state: UserState, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = action.payload.data.message;

            })

            .addCase(resetMyPassword.pending, (state: UserState) => {
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })

            .addCase(resetMyPassword.rejected, (state: UserState, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.error as string;
            })

            .addCase(userInformation.fulfilled, (state: UserState, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = action.payload.data.message;
                state.userName = action.payload.data.response.userName;
                state.phoneNumber = action.payload.data?.response.phoneNumber;
                state.userImage = action.payload.data?.response.userImage;
                state.deliveryAddress = action.payload.data?.response.deliveryAddress;
                state.email = action.payload.data?.response.email;
            })

            .addCase(userInformation.pending, (state: UserState) => {
                state.isError = false;
                state.isLoading = true;
                state.message = '';
                state.userName = '';
                state.phoneNumber = null;
                state.userImage = '';
                state.deliveryAddress = '';
                state.email = '';
            })

            .addCase(userInformation.rejected, (state: UserState, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.error as string;
                state.userName = '';
                state.phoneNumber = null;
                state.userImage = '';
                state.deliveryAddress = '';
                state.email = '';
            })

            .addCase(updateProfile.fulfilled, (state: UserState, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = '';
                state.userName = action.meta.arg.userData.userName;
                state.phoneNumber = Number(action.meta.arg.userData.phoneNumber);
                state.userImage = (action.meta.arg.userData.userImage)?.toString();
                state.deliveryAddress = action.meta.arg.userData.deliveryAddress;
                state.email = '';
            })

            .addCase(updateProfile.pending, (state: UserState) => {
                state.isError = false;
                state.isLoading = true;
                state.message = '';
                state.userName = '';
                state.phoneNumber = null;
                state.userImage = '';
                state.deliveryAddress = '';
                state.email = '';
            })

            .addCase(updateProfile.rejected, (state: UserState, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.error as string;
                state.userName = '';
                state.phoneNumber = null;
                state.userImage = '';
                state.deliveryAddress = '';
                state.email = '';
            })
    }
});

export const getIsUserLoading = (state: any) => state.user.isLoading;
export const userInfo = (state:any) => state.user;

export const userReducer = userSlice.reducer;