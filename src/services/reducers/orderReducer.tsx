import {createReducer} from '@reduxjs/toolkit'
import {postOrderRequest, postOrderSuccess, postOrderFailure} from "../actions/orderActions";

const initialState = {
    order: {
        number: "034536"
    },
    isLoading: false,
    hasError: false,
};

const orderReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(postOrderRequest, (state, action) => {
            return {
                ...state,
                isLoading: true,
                hasError: false,
            }
        })
        .addCase(postOrderSuccess, (state, action) => {
            return {
                ...state,
                order: {
                    ...action.payload,
                    number: action.payload.order.number.toString(),
                },
                isLoading: false,
                hasError: false,
            }
        })
        .addCase(postOrderFailure, (state, action) => {
            return {
                ...state,
                isLoading: false,
                hasError: true,
            }
        })
})

export default orderReducer;
