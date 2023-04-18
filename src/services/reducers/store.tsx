import {combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import productReducer from './productReducer';
import {configureStore} from "@reduxjs/toolkit";
import orderReducer from "./orderReducer";
import ingredientReducer from "./ingredientReducer";
import ingredientDetailsReducer from "./ingredientDetailsReduser";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const rootReducer = combineReducers({
    products: productReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredients: ingredientReducer,
    order: orderReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [composeEnhancers()],
});

export default store;
