import {createAction} from '@reduxjs/toolkit'

export const changePassword = createAction<string>('CHANGE_PASSWORD');
export const cleanPassword = createAction('CLEAN_PASSWORD');
