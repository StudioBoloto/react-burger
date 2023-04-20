import {createAction} from '@reduxjs/toolkit'
import {IProduct} from "../../models";

export const addIngredient = createAction<IProduct>('INGREDIENT_INCREMENT');
export const removeIngredient = createAction<IProduct>('INGREDIENT_DECREMENT');
export const replaceIngredient = createAction<IProduct>('INGREDIENT_REPLACE');
export const sortIngredient = createAction<{ oldIndex: number; newIndex: number }>('INGREDIENT_CHANGE_ORDER');

