import {createAsyncThunk} from '@reduxjs/toolkit'
import {ILoginRequest, IRegistrationRequest, ITokenRequest} from "../../models";
import {config, request} from "../Api";
import {NavigateFunction} from 'react-router-dom';
import {RootState} from "../reducers/store";
import {updateToken} from "./authActions";

export const loginUser = createAsyncThunk(
    'user/login',
    async (payload: { body: ILoginRequest; navigate: NavigateFunction; navigateTo: string; }, thunkAPI) => {
        try {
            const {body, navigate, navigateTo} = payload;
            const response = await request('/auth/login', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(body),
            });
            const data = await response;
            localStorage.setItem('userData', JSON.stringify(data));
            navigate(navigateTo);
            return data;
        } catch (error: any) {
            throw new Error(`Ошибка авторизации пользователя: ${error.message}`);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (payload: {
        body: ITokenRequest;
        navigate: NavigateFunction;
        navigateTo: string;
        navigateFrom: string;
    }, thunkAPI) => {
        try {
            const {body, navigate, navigateTo, navigateFrom} = payload;
            const response = await request('/auth/logout', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(body),
            });
            const data = await response;
            localStorage.removeItem('userData');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate(navigateTo, {state: {from: navigateFrom}});
            return data;
        } catch (error: any) {
            throw new Error(`Ошибка выхода из системы пользователя: ${error.message}`);
        }
    }
);

export const createUser = createAsyncThunk(
    'user/createUser',
    async (payload: { body: IRegistrationRequest; navigate: NavigateFunction; navigateTo: string; }, thunkAPI) => {
        try {
            const {body, navigate, navigateTo} = payload;
            const response = await request('/auth/register', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(body),
            });
            const data = await response;
            navigate(navigateTo);
            return data;
        } catch (error: any) {
            throw new Error(`Ошибка создания пользователя: ${error.message}`);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (body: IRegistrationRequest, thunkAPI) => {
        try {
            const response = await request('/auth/user', {
                method: 'PATCH',
                headers: config.headers,
                body: JSON.stringify(body)
            });
            const data = await response;
            return data;
        } catch (error: any) {
            throw new Error(`Ошибка обновления данных пользователя: ${error.message}`);
        }
    }
);

// @ts-ignore
export const getUser = createAsyncThunk(
    'user/getUser',
    async (payload: ITokenRequest, thunkAPI) => {
        try {
            const {token} = payload;
            const response = await request('/auth/user', {
                method: 'GET',
                headers: {
                    ...config.headers,
                    Authorization: token,
                },
            });
            return await response;
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
                            return thunkAPI.dispatch(getUser({token: accessToken}));
                        })
                        .catch(() => {
                            throw new Error('Failed to refresh token');
                        });
                }
            }
            throw new Error(`Ошибка получения данных пользователя: ${error.message}`);
        }
    }
);
