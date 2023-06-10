import {useDispatch} from "react-redux";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {changeEmail} from "../../services/actions/emailActions";
import {useSelector} from "../../services/hooks";

type EmailInputProps = {
    placeholder?: string;
    isIcon?: boolean
};

const EmailInputComponent = ({placeholder, isIcon}: EmailInputProps) => {
    const dispatch = useDispatch();
    const {email} = useSelector((state) => state.email);

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
