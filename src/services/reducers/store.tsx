import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import productReducer from './productReducer';
import {configureStore} from "@reduxjs/toolkit";
import orderReducer from "./orderReducer";
import ingredientReducer from "./ingredientReducer";
import ingredientDetailsReducer from "./ingredientDetailsReduser";
import {passwordReducer} from "./passwordReducer";
import {emailReducer} from "./emailReducer";
import {profileReducer} from "./profileReducer";
import {nameReducer} from "./nameReducer";

const rootReducer = combineReducers({
    products: productReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredients: ingredientReducer,
    order: orderReducer,
    name: nameReducer,
    email: emailReducer,
    password: passwordReducer,
    profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
