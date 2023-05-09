import React, {useRef, useState} from 'react';
import styles from '../Pages.module.css';
import {AppHeader} from "../../components/AppHeader/AppHeader";
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EmailInputComponent from "../../components/EmailInputComponent/EmailInputComponent";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {createUser} from "../../services/Api";

export const Register = () => {
    const [valueName, setValueName] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);
    const {email} = useSelector((state: RootState) => state.email);
    const {password} = useSelector((state: RootState) => state.password);
    const navigate = useNavigate();
    const handleButtonClick = () => {
        createUser({name: valueName, email: email, password: password}).then((data) => {
            //dispatch(createUserSuccess(data));
            navigate("/login");
            console.log(data);
            //{success: true, user: {email: "sdfsfdf@fwefreff.tu", name: "sadownik"},
            // accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC…zA3fQ.2X-SNL3YKcWEWfXWw0_k-cWsdne8A3CNWxDVjdHhwlY",
            // refreshToken: "3ce56baaee8b3b223f551ed17d816cc7240ff16c40855a1aebe3eafd066a2c2825b7abca2e377899"
            // }
        }).catch((error) => {
            //dispatch(createUserFailure(error));
        });
    };

    return (
        <div className={styles.wrapper}>
            <AppHeader selected={"Личный кабинет"}/>
            <div className={styles.container}>
                <p className="text text_type_main-medium mb-6">Регистрация</p>
                <div className={styles.content}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setValueName(e.target.value)}
                        value={valueName}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mb-6"
                    />
                    <EmailInputComponent/>
                    <PasswordInput placeholder={'Пароль'}/>
                    <Button htmlType="button" type="primary" size="large" extraClass="mb-20"
                            onClick={handleButtonClick}>
                        Зарегистрироваться
                    </Button>
                    <p className="text text_type_main-small text_color_inactive mb-4">
                        Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
