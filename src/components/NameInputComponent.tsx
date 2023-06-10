import {useDispatch} from "react-redux";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef, useState} from "react";
import {changeName} from "../services/actions/nameActions";
import {useSelector} from "../services/hooks";

type IconType = 'EditIcon' | undefined;

type NameInputProps = {
    placeholder: string | undefined;
    icon: IconType;
};

const NameInputComponent = ({placeholder, icon}: NameInputProps) => {
    const [isDisabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const {name} = useSelector((state) => state.name);
    const inputRef = useRef<HTMLInputElement>(null);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeName(e.target.value));
    };

    const onIconClick = () => {
        setDisabled(!isDisabled);
        inputRef.current?.focus();
    };

    return (
        <Input
            type={"text"}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={onNameChange}
            icon={icon}
            value={name}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
        />
    );
};

export default NameInputComponent;
