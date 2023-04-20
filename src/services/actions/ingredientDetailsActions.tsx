import { createAction } from '@reduxjs/toolkit'
import {IProduct} from "../../models";

export const getIngredientInfo = createAction<IProduct | undefined>('GET_INGREDIENT_INFO');
