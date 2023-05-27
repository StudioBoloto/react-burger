import {createSlice} from "@reduxjs/toolkit";
import {createUser, getUser, loginUser, logoutUser, updateUser} from "../actions/userActions";
import {IUser} from "../../models";

interface UserState {
    isLoggedIn: boolean;
    user: IUser | null;
    loading: boolean;
    error: string | undefined;
}

const initialState: UserState = {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = undefined;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.loading = false;
                state.error = undefined;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = undefined;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = undefined;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = undefined;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export default userSlice.reducer;
