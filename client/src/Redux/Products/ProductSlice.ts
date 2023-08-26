import { createSlice } from "@reduxjs/toolkit";
import { ProductsData } from "../../interfaces/interfaces";
import { getAllProducts } from "./ProductsActions";


interface ProductsState {
    isLoading: boolean,
    isError: boolean,
    products: ProductsData[] | null,
}

const initialProductsState: ProductsState = {
    isLoading: false,
    isError: false,
    products: null
}


export const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {},
    extraReducers(builder) {
        builder

            .addCase(getAllProducts.fulfilled, (state: ProductsState, action) => {
                state.isError = false;
                state.isLoading = true;
                state.products = action.payload;
                console.log(action.payload);
                
            })
            .addCase(getAllProducts.pending, (state: ProductsState) => {
                state.isError = false;
                state.isLoading = true;
                state.products = null;
            })
            .addCase(getAllProducts.rejected, (state: ProductsState,action) => {
                state.isError = true;
                state.isLoading = false;
                state.products = null;
            })
    },
});

export const productsReducer = productsSlice.reducer