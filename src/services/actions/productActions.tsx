import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {IProduct} from "../../models";
import {config, request} from "../Api";

export const updateProductCount = createAction<IProduct[]>('UPDATE_PRODUCT_COUNT')

export const getProducts = createAsyncThunk(
    'ingredients/fetch',
    async () => {
        try {
            const response = await request('/ingredients', {
                headers: config.headers
            });
            return await response;
        } catch (error: any) {
            throw new Error(`Ошибка получения ингредиентов: ${error.message}`);
        }
    }
);
