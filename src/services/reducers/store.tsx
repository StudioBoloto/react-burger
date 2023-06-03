import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import productReducer from './productReducer';
import {configureStore} from "@reduxjs/toolkit";
import orderReducer from "./orderReducer";
import ordersReducer from './orderSlice';
import ingredientReducer from "./ingredientReducer";
import ingredientDetailsReducer from "./ingredientDetailsReduser";
import {passwordReducer} from "./passwordReducer";
import {emailReducer} from "./emailReducer";
import {profileReducer} from "./profileReducer";
import {nameReducer} from "./nameReducer";
import userReducer from './userReducer';
import authReducer from "./authReducer";
import {socketMiddleware} from "../middleware/socketMiddleware";


const rootReducer = combineReducers({
    products: productReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredients: ingredientReducer,
    order: orderReducer,
    orders: ordersReducer,
    name: nameReducer,
    email: emailReducer,
    password: passwordReducer,
    profile: profileReducer,
    user: userReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware, socketMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
