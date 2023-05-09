import React from 'react';
import styles from '../Pages.module.css';
import {AppHeader} from "../../components/AppHeader/AppHeader";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from "react-router-dom";
import EmailInputComponent from "../../components/EmailInputComponent/EmailInputComponent";
import {useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {resetPassword} from "../../services/Api";

export const ForgotPassword = () => {
    const {email} = useSelector((state: RootState) => state.email);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        resetPassword({email: email}).then((data) => {
            //dispatch(resetPasswordSuccess(data));
            navigate("/reset-password");
            console.log(data);
        }).catch((error) => {
            //dispatch(resetPasswordFailure(error));
        });
    }
    return (
        <div className={styles.wrapper}>
            <AppHeader selected={"Личный кабинет"}/>
            <div className={styles.container}>
                <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
                <div className={styles.content}>
                    <EmailInputComponent placeholder={'Укажите e-mail'}/>
                    <Button htmlType="button" type="primary" size="large" extraClass="mb-20"
                    onClick={handleButtonClick}>
                        Восстановить
                    </Button>
                    <p className="text text_type_main-small text_color_inactive mb-4">
                        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
