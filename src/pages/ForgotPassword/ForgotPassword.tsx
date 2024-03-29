import React, {FormEvent} from 'react';
import styles from '../Pages.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from "react-router-dom";
import EmailInputComponent from "../../components/EmailInputComponent/EmailInputComponent";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {resetPassword} from "../../services/actions/authActions";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const ForgotPassword = () => {
    const {email} = useSelector((state: RootState) => state.email);
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(resetPassword({
            body: {email: email},
            navigate: navigate,
            navigateTo: ('/reset-password'),
            navigateFrom: ('/forgot-password'),
        }));
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.content}>
                        <EmailInputComponent placeholder={'Укажите e-mail'}/>
                        <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">Восстановить</Button>
                        <p className="text text_type_main-small text_color_inactive mb-4">
                            Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
