import {createSlice} from '@reduxjs/toolkit';
import {resetPassword, updatePassword, updateToken} from "../actions/authActions";

interface AuthState {
    retryCount: number;
    isRefreshingToken: boolean;
    loading: boolean;
    error: string | undefined;
}

const initialState: AuthState = {
    retryCount: 0,
    isRefreshingToken: false,
    loading: false,
    error: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateToken.fulfilled, (state, action) => {
            state.isRefreshingToken = false;
            state.retryCount = 0;
            state.loading = false;
            state.error = undefined;
        });

        builder.addCase(updateToken.rejected, (state, action) => {
            state.isRefreshingToken = false;
            state.retryCount += 1;
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updateToken.pending, (state, action) => {
            state.isRefreshingToken = true;
            state.loading = true;
            state.error = undefined;
        });

        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = undefined;
        });

        builder.addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updatePassword.pending, (state, action) => {
            state.loading = true;
            state.error = undefined;
        });

        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = undefined;
        });

        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(resetPassword.pending, (state, action) => {
            state.loading = true;
            state.error = undefined;
        });
    },
});

export default authSlice.reducer;
