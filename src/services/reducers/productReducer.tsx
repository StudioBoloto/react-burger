import {createSlice} from '@reduxjs/toolkit';
import {IProduct} from "../../models";
import {getProducts, updateProductCount} from "../actions/productActions";

interface ProductState {
    products: IProduct[];
    isLoading: boolean;
    hasError: boolean;
    error: string | undefined;
}

const initialState: ProductState = {
    products: [] as IProduct[],
    isLoading: false,
    hasError: false,
    error: undefined,
};

const productSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.error = undefined;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload.data;
                state.isLoading = false;
                state.hasError = false;
                state.error = undefined;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.error = action.error.message;
            })
            .addCase(updateProductCount, (state, action) => {
                state.products = action.payload;
            });
    },
});

export default productSlice.reducer;
