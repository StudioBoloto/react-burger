import {createAction} from '@reduxjs/toolkit'
import {IUser} from "../../models";

export const updateProfile = createAction<IUser>('UPDATE_PROFILE');
