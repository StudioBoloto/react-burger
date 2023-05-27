import { createReducer } from "@reduxjs/toolkit";
import {updateProfile} from "../actions/profileActions";

const initialState = {
    currentEmail: '',
    currentName: '',
};

export const profileReducer = createReducer(initialState, (builder) => {
    builder.addCase(updateProfile, (state, action) => {
        const {currentEmail, currentName} = action.payload
        return { ...state, currentEmail: currentEmail, currentName: currentName};
    });
});
