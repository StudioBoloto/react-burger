import { combineReducers } from 'redux';
import productReducer from './productReducer';
// импортируйте другие редьюсеры

const rootReducer = combineReducers({
    products: productReducer,
    // добавьте другие редьюсеры
});

export default rootReducer;
