import {createReducer} from '@reduxjs/toolkit'
import {
    getProductsRequest,
    getProductsSuccess,
    getProductsFailure,
    updateProductCount
} from "../actions/productActions";
import {IProduct} from "../../models";

const initialState = {
    products: [] as IProduct[],
    isLoading: false,
    hasError: false,
};

const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getProductsRequest, (state, action) => {
            return {
                ...state,
                isLoading: true,
                hasError: false,
            }
        })
        .addCase(getProductsSuccess, (state, action) => {
            return {
                ...state,
                products: action.payload,
                isLoading: false,
                hasError: false,
            }
        })
        .addCase(getProductsFailure, (state, action) => {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            }
        })
        .addCase(updateProductCount, (state, action) => {
            state.products = action.payload;
        });
})

export default productReducer;
