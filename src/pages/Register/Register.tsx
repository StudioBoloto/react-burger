import React, {FormEvent, useRef, useState} from 'react';
import styles from '../Pages.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import EmailInputComponent from "../../components/EmailInputComponent/EmailInputComponent";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {createUser} from "../../services/actions/userActions";
import {useDispatch, useSelector} from "../../services/hooks";

export const Register = () => {
    const [valueName, setValueName] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);
    const {email} = useSelector((state) => state.email);
    const {password} = useSelector((state) => state.password);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(createUser({
            body: {name: valueName, email: email, password: password},
            navigate: navigate,
            navigateTo: ('/login')
        }));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className="text text_type_main-medium mb-6">Регистрация</p>
                <form onSubmit={handleFormSubmit}>
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
                        <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
                            Зарегистрироваться
                        </Button>
                        <p className="text text_type_main-small text_color_inactive mb-4">
                            Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
