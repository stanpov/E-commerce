import { createSlice } from '@reduxjs/toolkit';
import { InitalState } from '../../interfaces/interfaces'
import { changeMyPassword } from './UersActions';



const initialUserState: InitalState = {
    message: '',
    isError: false,
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {},
    extraReducers(builder) {
        builder

            .addCase(changeMyPassword.fulfilled, (state: InitalState, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = action.payload.data.message;
            })
            .addCase(changeMyPassword.pending, (state: InitalState) => {
                state.isError = false;
                state.isLoading = true;
                state.message = '';
            })

            .addCase(changeMyPassword.rejected, (state: InitalState, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.error as string;
            })
    }
})

export const userReducer = userSlice.reducer;