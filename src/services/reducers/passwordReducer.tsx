import { createReducer } from "@reduxjs/toolkit";
import {changePassword, cleanPassword} from "../actions/passwordActions";

const initialState = {
    password: '',
};

export const passwordReducer = createReducer(initialState, (builder) => {
    builder.addCase(changePassword, (state, action) => {
        return { ...state, password: action.payload };
    })
        .addCase(cleanPassword, (state, action) => {
            return initialState;
        });
});
