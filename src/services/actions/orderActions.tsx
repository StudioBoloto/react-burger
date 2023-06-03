import {createAsyncThunk} from '@reduxjs/toolkit'
import {IOrderResponse} from "../../models";
import {config, request} from "../Api";

export const createOrder = createAsyncThunk<IOrderResponse, { ingredients: string[]; token: string }>(
    'orders/create',
    async ({ ingredients, token }) => {
        const body = {
            ingredients
        };
        try {
            const response = await request('/orders', {
                method: 'POST',
                headers: {
                    ...config.headers,
                    Authorization: token,
                },
                body: JSON.stringify(body)
            });
            return await response;
        } catch (error: any) {
            throw new Error(`Ошибка создания заказа: ${error.message}`);
        }
    }
);
