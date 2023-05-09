import { createReducer } from "@reduxjs/toolkit";
import { changePassword } from "../actions/passwordActions";

const initialState = {
    password: '',
};

export const passwordReducer = createReducer(initialState, (builder) => {
    builder.addCase(changePassword, (state, action) => {
        return { ...state, password: action.payload };
    });
});
