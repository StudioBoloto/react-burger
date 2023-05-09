import React from 'react';
import styles from '../Pages.module.css';
import {AppHeader} from "../../components/AppHeader/AppHeader";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useNavigate} from "react-router-dom";
import EmailInputComponent from "../../components/EmailInputComponent/EmailInputComponent";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {loginUser} from "../../services/Api";

export const Login = () => {
    const {email} = useSelector((state: RootState) => state.email);
    const {password} = useSelector((state: RootState) => state.password);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        loginUser({email: email, password: password}).then((data) => {
            //dispatch(loginUserSuccess(data));
            navigate("/");
            console.log(data);
        }).catch((error) => {
            //dispatch(loginUserFailure(error));
        });
    };

    return (
        <div className={styles.wrapper}>
            <AppHeader selected={"Личный кабинет"}/>
            <div className={styles.container}>
                <p className="text text_type_main-medium mb-6">Вход</p>
                <div className={styles.content}>
                    <EmailInputComponent/>
                    <PasswordInput placeholder={'Пароль'}/>
                    <Button htmlType="button" type="primary" size="large" extraClass="mb-20"
                            onClick={handleButtonClick}>
                        Войти
                    </Button>
                    <p className="text text_type_main-small text_color_inactive mb-4">
                        Вы — новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
                    </p>
                    <p className="text text_type_main-small text_color_inactive mb-4">
                        Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
