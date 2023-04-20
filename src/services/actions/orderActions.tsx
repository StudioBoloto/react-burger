import { createAction } from '@reduxjs/toolkit'
import {IOrderResponse} from "../../models";

export const postOrderRequest = createAction('POST_ORDER_REQUEST')
export const postOrderSuccess = createAction<IOrderResponse>('POST_ORDER_SUCCESS')
export const postOrderFailure = createAction('POST_ORDER_FAILURE')
