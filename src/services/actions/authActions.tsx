import {createAsyncThunk} from '@reduxjs/toolkit';
import {config, request} from "../Api";
import {NavigateFunction} from 'react-router-dom';
import {IPasswordRequest, IPasswordResetRequest, ITokenRequest} from "../../models";
import {RootState} from "../reducers/store";

export const updateToken = createAsyncThunk(
    'user/updateToken',
    async (body: ITokenRequest) => {
        try {
            const response = await request('/auth/token', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(body)
            });
            const data = await response;
            localStorage.setItem('accessToken', data.accessToken);
            return data;
        } catch (error: any) {
            throw new Error(`Ошибка обновления токена: ${error.message}`);
        }
    }
);

// @ts-ignore
export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async (payload: {
        body: IPasswordRequest;
        accessToken: string;
        navigate: NavigateFunction;
        navigateTo: string;
    }, thunkAPI) => {
        try {
            const {body, accessToken, navigate, navigateTo} = payload;
            const response = await request('/password-reset/reset', {
                method: 'POST',
                headers: {
                    ...config.headers,
                    Authorization: accessToken,
                },
                body: JSON.stringify(body)
            });
            const data = await response;
            navigate(navigateTo);
            return data;
        } catch (error: any) {
            console.log(error)
            if (error === 'Ошибка: 401') {
                const state = thunkAPI.getState() as RootState;
                const savedUserData = localStorage.getItem('userData');
                const retryCount = state.auth.retryCount || 0;
                const maxRetries = 3;
                if (retryCount < maxRetries && !state.auth.isRefreshingToken && savedUserData) {
                    const userData = JSON.parse(savedUserData);
                    const refreshToken = userData.refreshToken ?? '';
                    return thunkAPI.dispatch(updateToken({token: refreshToken}))
                        .then(() => {
                            const accessToken = localStorage.getItem('accessToken') ?? '';
                            const updatedPayload = {
                                ...payload,
                                accessToken: accessToken
                            };
                            return thunkAPI.dispatch(updatePassword(updatedPayload));
                        })
                        .catch(() => {
                            throw new Error('Failed to refresh token');
                        });
                }
            }
            throw new Error(`Ошибка обновления пароля: ${error.message}`);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async (payload: {
        body: IPasswordResetRequest;
        navigate: NavigateFunction;
        navigateTo: string;
        navigateFrom: string;
    }, thunkAPI) => {
        try {
            const {body, navigate, navigateTo, navigateFrom} = payload;
            const response = await request('/password-reset', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(body)
            });
            const data = await response;
            navigate(navigateTo, {state: {from: navigateFrom}});
            return data;
        } catch (error: any) {
            throw new Error(`Ошибка сброса пароля: ${error.message}`);
        }
    }
);
