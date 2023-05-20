import {createReducer, current} from '@reduxjs/toolkit';
import {
    addIngredient,
    clearOrder,
    removeIngredient,
    replaceIngredient,
    sortIngredient
} from "../actions/ingredientActions";
import {IProduct} from "../../models";

interface State {
    totalPrice: number;
    ingredientsIds: string[];
    basket: IProduct[];
    bun: IProduct | undefined;
}

const initialState: State = {
    totalPrice: 0,
    ingredientsIds: [],
    basket: [],
    bun: undefined,
};

const ingredientReducer = createReducer(initialState, (builder => {
        builder
            .addCase(addIngredient, (state, action) => {
                const {payload: ingredient} = action;
                if (ingredient.type === "bun") {
                    if (state.bun !== undefined) {
                        return {
                            ...state,
                        };
                    }
                    state.bun = ingredient;
                    state.totalPrice += ingredient.price;
                    state.ingredientsIds.push(ingredient._id);
                } else {
                    ingredient.type = "item";
                    state.basket.push(ingredient);
                }
                state.ingredientsIds.push(ingredient._id);
                state.totalPrice += ingredient.price;
            })
            .addCase(removeIngredient, (state, action) => {
                const {payload: ingredient} = action;
                if (ingredient.type === 'bun') {
                    return {
                        ...state,
                    };
                }
                const ingredientIdIndex = state.ingredientsIds.findIndex((id) => id === ingredient._id);
                if (ingredientIdIndex !== -1) {
                    state.ingredientsIds.splice(ingredientIdIndex, 1);
                }
                const ingredientIndex = state.basket.findIndex((product) => product._id === ingredient._id);
                if (ingredientIndex !== -1) {
                    state.basket.splice(ingredientIndex, 1);
                }
                state.totalPrice -= ingredient.price;
            })
            .addCase(replaceIngredient, (state, action) => {
                const {payload: ingredient} = action;
                if (ingredient.type !== 'bun') {
                    return {
                        ...state,
                    };
                }
                if (state.bun === undefined) {
                    return {
                        ...state,
                    };
                }
                state.totalPrice -= state.bun.price * 2;
                state.ingredientsIds = state.ingredientsIds.filter((id) => id !== state.bun?._id);
                state.bun = ingredient;
                state.totalPrice += state.bun.price * 2;
                state.ingredientsIds.push(ingredient._id);
                state.ingredientsIds.push(ingredient._id);
            })
            .addCase(sortIngredient, (state, action) => {
                const {oldIndex, newIndex} = action.payload;
                const [removed] = state.basket.splice(oldIndex, 1);
                state.basket.splice(newIndex, 0, removed);
            })
            .addCase(clearOrder, (state, action) => {
                return initialState;
            });
    })
);

export default ingredientReducer;
