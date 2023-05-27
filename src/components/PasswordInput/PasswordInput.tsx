import React, { useState, useRef } from 'react';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {changePassword} from "../../services/actions/passwordActions";

type PasswordInputProps = {
    placeholder: string;
};

const PasswordInput = ({ placeholder }: PasswordInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const {password} = useSelector((state: RootState) => state.password);
    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        setIsPasswordVisible(prevValue => !prevValue);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changePassword(e.target.value));
    };

    return (
        <Input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={placeholder}
            onChange={onPasswordChange}
            icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
            value={password}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
        />
    );
};

export default PasswordInput;
