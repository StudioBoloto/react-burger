import {createAction} from '@reduxjs/toolkit'

export const changeEmail = createAction<string>('CHANGE_EMAIL');
