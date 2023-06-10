import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import productReducer from './reducers/productReducer';
import {configureStore} from "@reduxjs/toolkit";
import orderReducer from "./reducers/orderReducer";
import ordersReducer, {socketMiddlewareOptions} from './reducers/orderSlice';
import ingredientReducer from "./reducers/ingredientReducer";
import ingredientDetailsReducer from "./reducers/ingredientDetailsReduser";
import {passwordReducer} from "./reducers/passwordReducer";
import {emailReducer} from "./reducers/emailReducer";
import {profileReducer} from "./reducers/profileReducer";
import {nameReducer} from "./reducers/nameReducer";
import userReducer from './reducers/userReducer';
import authReducer from "./reducers/authReducer";
import {socketMiddleware} from "./middleware/socketMiddleware";

export const rootReducer = combineReducers({
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

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware, socketMiddleware(socketMiddlewareOptions)],
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
