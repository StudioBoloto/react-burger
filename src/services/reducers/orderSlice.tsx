import {createSlice} from '@reduxjs/toolkit';
import {IOrdersInfo} from "../../models";

const authorizedActions = ['orders/setUserOrders'];
const unauthorizedActions = ['orders/setAllOrders'];

export const socketMiddlewareOptions = {
    authorizedActions,
    unauthorizedActions
};

interface OrdersState {
    isConnected: boolean;
    userOrders: IOrdersInfo | undefined;
    allOrders: IOrdersInfo| undefined;
    wsUrl: string | null;
}

const initialState: OrdersState = {
    isConnected: false,
    userOrders: undefined,
    allOrders: undefined,
    wsUrl: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setConnection: (state, action) => {
             action.payload = state.wsUrl;
        },
        setUserOrders: (state, action) => {
            state.userOrders = action.payload;
        },
        setAllOrders: (state, action) => {
            state.allOrders = action.payload;
        },
        setConnectionStatus: (state, action) => {
            state.isConnected = action.payload;
        },
        closeConnection:(state, action) => {
        }
    },
});

export const { setConnection, setUserOrders, setAllOrders, setConnectionStatus, closeConnection } = orderSlice.actions;
export const ordersReducer = orderSlice.reducer;
export default orderSlice.reducer;
