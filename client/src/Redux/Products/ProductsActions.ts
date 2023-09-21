import { createAsyncThunk } from "@reduxjs/toolkit"
import { getProducts, searchProduct } from "./ProductsServices"
import { ProductsData, SearchItem } from "../../interfaces/interfaces";


export const getAllProducts = createAsyncThunk('products/Allproducts', async (productsData:ProductsData,thunkAPI) => {
    try {
        return getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue({message:error})
    }
})

export const getSearchedProducts = createAsyncThunk('products/SearchProducts', async (search:SearchItem,thunkAPI) => {
    try {
        return searchProduct(search);
    } catch (error) {
        return thunkAPI.rejectWithValue({message:error})
    }
})

