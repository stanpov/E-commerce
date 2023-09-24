import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/interfaces";
import { getProductById } from "./CurrentProductActions";


interface ProductState extends Product {
    isLoading: boolean,
    isError: boolean,
    message: string,
}

const initialProductState: ProductState = {
    isLoading: false,
    isError: false,
    _id: '',
    productName: '',
    image: '',
    category: '',
    description: '',
    price: 0,
    countInStock: 0,
    rating: [],
    numReviews: 0,
    brand: '',
    createdAt: '',
    updatedAt: '',
    message: '',
};


export const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState: initialProductState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getProductById.fulfilled, (state: ProductState, action) => {
                state.isLoading = false;
                state.isError = false;
                state._id = action.payload._id;
                state.productName = action.payload.productName;
                state.image = action.payload.image;
                state.category = action.payload.category;
                state.description = action.payload.description;
                state.price = action.payload.price;
                state.countInStock = action.payload.countInStock;
                state.rating = action.payload.rating;
                state.numReviews = action.payload.numReviews;
                state.brand = action.payload.brand;
                state.createdAt = action.payload.createdAt;
                state.updatedAt = action.payload.updatedAt;
                state.message = '';
                console.log(action);
                

            })
            .addCase(getProductById.pending, (state: ProductState) => {
                state.isLoading = true;
                state.isError = false;
                state._id = '';
                state.productName = '';
                state.image = '';
                state.category = '';
                state.description = '';
                state.price = 0;
                state.countInStock = 0;
                state.rating = [];
                state.numReviews = 0;
                state.brand = '';
                state.createdAt = '';
                state.updatedAt = '';
                state.message = '';

            })
            .addCase(getProductById.rejected, (state: ProductState, action) => {
                state.isLoading = false;
                state.isError = true;
                state._id = '';
                state.productName = '';
                state.image = '';
                state.category = '';
                state.description = '';
                state.price = 0;
                state.countInStock = 0;
                state.rating = [];
                state.numReviews = 0;
                state.brand = '';
                state.createdAt = '';
                state.updatedAt = '';
                state.message = action.error as string;;
            })
    }
})

export const singleProductReducer = singleProductSlice.reducer;