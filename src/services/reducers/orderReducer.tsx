import {createSlice} from '@reduxjs/toolkit';
import {createOrder} from "../actions/orderActions";

const initialState = {
    order: {
        number: "034536"
    },
    isLoading: false,
    hasError: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    hasError: false,
                };
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                return {
                    ...state,
                    order: {
                        ...action.payload,
                        number: action.payload.order.number.toString(),
                    },
                    isLoading: false,
                    hasError: false,
                };
            })
            .addCase(createOrder.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    hasError: true,
                };
            });
    },
});

export default orderSlice.reducer;
