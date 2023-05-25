import {createAsyncThunk} from '@reduxjs/toolkit'
import {IOrderResponse} from "../../models";
import {config, request} from "../Api";

export const createOrder = createAsyncThunk<IOrderResponse, string[]>(
    'orders/create',
    async (ingredients: string[]) => {
        const body = {
            ingredients
        };
        try {
            const response = await request('/orders', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(body)
            });
            return await response;
        } catch (error: any) {
            throw new Error(`Ошибка создания заказа: ${error.message}`);
        }
    }
);
