import React, {FormEvent} from 'react';
import styles from '../Pages.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useLocation, useNavigate} from "react-router-dom";
import EmailInputComponent from "../../components/EmailInputComponent/EmailInputComponent";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {loginUser} from "../../services/actions/userActions";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const Login = () => {
    const {email} = useSelector((state: RootState) => state.email);
    const {password} = useSelector((state: RootState) => state.password);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(loginUser({
            body: {email: email, password: password},
            navigate: navigate,
            navigateTo: (location.state?.from || '/')
        }));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className="text text_type_main-medium mb-6">Вход</p>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.content}>
                        <EmailInputComponent/>
                        <PasswordInput placeholder={'Пароль'}/>
                        <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">Войти</Button>
                        <p className="text text_type_main-small text_color_inactive mb-4">
                            Вы — новый пользователь? <Link to='/register'
                                                           className={styles.link}>Зарегистрироваться</Link>
                        </p>
                        <p className="text text_type_main-small text_color_inactive mb-4">
                            Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить
                            пароль</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
