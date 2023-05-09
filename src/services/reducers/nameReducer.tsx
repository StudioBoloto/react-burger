import { createReducer } from "@reduxjs/toolkit";
import {changeName} from "../actions/nameActions";

const initialState = {
    name: '',
};

export const nameReducer = createReducer(initialState, (builder) => {
    builder.addCase(changeName, (state, action) => {
        return { ...state, name: action.payload };
    });
});
