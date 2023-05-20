import React, {FormEvent, useEffect, useRef, useState} from 'react';
import styles from '../Pages.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useLocation, useNavigate} from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {updatePassword} from "../../services/actions/authActions";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const ResetPassword = () => {
    const [valueCode, setValueCode] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);
    const {password} = useSelector((state: RootState) => state.password);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

    useEffect(() => {
        if (location.state?.from !== '/forgot-password') {
            navigate('/forgot-password');
        }
    }, [location.state?.from, navigate]);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const accessToken = localStorage.getItem("accessToken") ?? "";
        dispatch(updatePassword({
            body: {password: password, token: valueCode},
            accessToken: accessToken,
            navigate: navigate,
            navigateTo: ('/login')
        }));
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
                <form onSubmit={handleFormSubmit}>
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
                        <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">Сохранить</Button>
                        <p className="text text_type_main-small text_color_inactive mb-4">
                            Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
