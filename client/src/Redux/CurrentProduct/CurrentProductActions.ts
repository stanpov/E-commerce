import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentProduct } from "./CurrentProductServices";

export const getProductById = createAsyncThunk('product/GetProductById', async (productId: string, thunkAPI) => {
    try {
        return getCurrentProduct(productId);
    } catch (error) {
        return thunkAPI.rejectWithValue({ message: error });
    }
});