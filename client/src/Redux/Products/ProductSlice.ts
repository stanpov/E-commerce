import { createSlice } from "@reduxjs/toolkit";
import { ProductsData } from "../../interfaces/interfaces";
import { getAllProducts, getFilterProducts, getSearchedProducts } from "./ProductsActions";


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
    brand:[],
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
                state.brand = action.payload.brand;
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
            .addCase(getSearchedProducts.fulfilled, (state: ProductsState, action) => {
                state.isError = false;
                state.isLoading = false;
                state.products = action.payload.products;
                state.category = action.payload.category;
                state.brand = action.payload.brand;
                state.total = action.payload.total;
                state.limit = action.payload.limit;
                state.page = action.payload.page;
            })
            .addCase(getSearchedProducts.pending, (state: ProductsState) => {
                state.isError = false;
                state.isLoading = true;
                state.products = [];
                state.category = [];
            })
            .addCase(getSearchedProducts.rejected, (state: ProductsState, action) => {
                state.isError = true;
                state.isLoading = false;
                state.products = [];
                state.category = [];
            })
            .addCase(getFilterProducts.fulfilled, (state: ProductsState, action) => {
                state.isError = false;
                state.isLoading = false;
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.limit = action.payload.limit;
                state.page = action.payload.page;
            })
            .addCase(getFilterProducts.pending, (state: ProductsState) => {
                state.isError = false;
                state.isLoading = true;
                state.products = [];
            })
            .addCase(getFilterProducts.rejected, (state: ProductsState, action) => {
                state.isError = true;
                state.isLoading = false;
                state.products = [];
            })
    },
});

export const isLoading = (state:any) => state.products.isLoading;
export const categories = (state:any) => state.products.category;
export const brand = (state:any) => state.products.brand;
export const allProducts = (state:any) => state.products.products;
export const productsReducer = productsSlice.reducer;