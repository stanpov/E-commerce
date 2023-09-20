import { createAsyncThunk } from "@reduxjs/toolkit"
import { getProducts } from "./ProductsServices"
import { ProductsData } from "../../interfaces/interfaces";


export const getAllProducts = createAsyncThunk('products/Allproducts', async (productsData:ProductsData,thunkAPI) => {
    try {
        return getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue({message:error})
    }
})

