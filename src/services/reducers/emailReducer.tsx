import { createReducer } from "@reduxjs/toolkit";
import { changeEmail } from "../actions/emailActions";

const initialState = {
    email: '',
};

export const emailReducer = createReducer(initialState, (builder) => {
    builder.addCase(changeEmail, (state, action) => {
        return { ...state, email: action.payload };
    });
});
