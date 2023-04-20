import {getIngredientInfo} from "../actions/ingredientDetailsActions";
import {createReducer} from "@reduxjs/toolkit";
import {IProduct} from "../../models";

interface State {
    ingredient: IProduct | undefined;
}

const initialState: State = {
    ingredient: undefined,
};

const ingredientDetailsReducer = createReducer(initialState, (builder => {
    builder
        .addCase(getIngredientInfo, (state, action) => {
            if (action.payload) {
                state.ingredient = action.payload;
            } else {
                state.ingredient = undefined;
            }
        })
    })
);

export default ingredientDetailsReducer;
