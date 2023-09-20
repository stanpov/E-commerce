import { createSlice } from "@reduxjs/toolkit";
import { ProductsData } from "../../interfaces/interfaces";
import { getAllProducts } from "./ProductsActions";


interface ProductsState extends ProductsData {
    isLoading: boolean,
    isError: boolean,
}

const initialProductsState: ProductsState = {
    isLoading: false,
    isError: false,
    total: 0,
    page: 0,
    limit: 0,
    category: [],
    products: [],
}


export const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {},
    extraReducers(builder) {
        builder

            .addCase(getAllProducts.fulfilled, (state: ProductsState, action) => {
                state.isError = false;
                state.isLoading = false;
                state.products = action.payload.products;
                state.category = action.payload.category;
                state.total = action.payload.total;
                state.limit = action.payload.limit;
                state.page = action.payload.page;
            })
            .addCase(getAllProducts.pending, (state: ProductsState) => {
                state.isError = false;
                state.isLoading = true;
                state.products = [];
                state.category = [];
            })
            .addCase(getAllProducts.rejected, (state: ProductsState, action) => {
                state.isError = true;
                state.isLoading = false;
                state.products = [];
                state.category = [];
            })
    },
});

export const isLoading = (state:any) => state.products.isLoading;
export const categories = (state:any) => state.products.category;
export const allProducts = (state:any) => state.products.products;
export const productsReducer = productsSlice.reducer;