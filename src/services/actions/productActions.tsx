import {createAction} from '@reduxjs/toolkit'
import {IProduct} from "../../models";

export const getProductsRequest = createAction('GET_PRODUCTS_REQUEST')
export const getProductsSuccess = createAction<[]>('GET_PRODUCTS_SUCCESS')
export const getProductsFailure = createAction('GET_PRODUCTS_FAILURE')
export const updateProductCount = createAction<IProduct[]>('UPDATE_PRODUCT_COUNT')
