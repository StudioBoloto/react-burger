import React, {useRef, useState} from 'react';
import styles from '../Pages.module.css';
import {AppHeader} from "../../components/AppHeader/AppHeader";
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {updatePassword} from "../../services/Api";
import {useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";

export const ResetPassword = () => {
    const [valueCode, setValueCode] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);
    const {password} = useSelector((state: RootState) => state.password);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        updatePassword({password: password, token: valueCode}).then((data) => {
            //dispatch(updatePasswordSuccess(data));
            navigate("/login");
            console.log(data);
        }).catch((error) => {
            //dispatch(updatePasswordFailure(error));
        });
    }
    return (
        <div className={styles.wrapper}>
            <AppHeader selected={"Личный кабинет"}/>
            <div className={styles.container}>
                <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
                <div className={styles.content}>
                    <PasswordInput placeholder={'Введите новый пароль'}/>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setValueCode(e.target.value)}
                        value={valueCode}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mb-6"
                    />
                    <Button htmlType="button" type="primary" size="large" extraClass="mb-20"
                    onClick={handleButtonClick}>
                        Сохранить
                    </Button>
                    <p className="text text_type_main-small text_color_inactive mb-4">
                        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
