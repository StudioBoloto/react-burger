import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {changeEmail} from "../../services/actions/emailActions";

type EmailInputProps = {
    placeholder?: string;
    isIcon?: boolean
};

const EmailInputComponent = ({placeholder, isIcon}: EmailInputProps) => {
    const dispatch = useDispatch();
    const {email} = useSelector((state: RootState) => state.email);

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeEmail(e.target.value));
    };
    return (
        <EmailInput
            placeholder={placeholder}
            onChange={onEmailChange}
            value={email}
            name={'email'}
            isIcon={isIcon? isIcon: false}
            size={'default'}
            extraClass="mb-6"
        />
    );
};

export default EmailInputComponent;
