import {rootReducer} from '../store';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
