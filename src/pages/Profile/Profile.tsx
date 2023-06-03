import styles from "../Pages.module.css";
import {Link, useNavigate} from "react-router-dom";
import React, {FormEvent} from "react";
import EmailInputComponent from "../../components/EmailInputComponent/EmailInputComponent";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import NameInputComponent from "../../components/NameInputComponent";
import {changeName} from "../../services/actions/nameActions";
import {changeEmail} from "../../services/actions/emailActions";
import {logoutUser, updateUser} from "../../services/actions/userActions";
import {cleanPassword} from "../../services/actions/passwordActions";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const Profile = () => {
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const {name} = useSelector((state: RootState) => state.name);
    const {email} = useSelector((state: RootState) => state.email);
    const {password} = useSelector((state: RootState) => state.password);
    const {currentEmail, currentName} = useSelector((state: RootState) => ({
        currentEmail: state.user?.user?.currentEmail || '',
        currentName: state.user?.user?.currentName || '',
    }));

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(updateUser({email: email, password: password, name: name}));
    }
    const handleCancelButtonClick = () => {
        dispatch(changeName(currentName));
        dispatch(changeEmail(currentEmail));
    }

    const handleLogoutClick = () => {
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            const token = userData.refreshToken ?? '';

            dispatch(logoutUser({
                body: {token},
                navigate: navigate,
                navigateTo: ('/login'),
                navigateFrom: ('/profile'),
            }));
        }
        dispatch(cleanPassword());
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.profile_wrapper}>
                <div className={styles.navigation}>
                    <Link to='/profile' className={`text text_type_main-medium 
                ${styles.navigation_element}`}>Профиль</Link>
                    <Link to='/profile/orders' className={`text text_type_main-medium text_color_inactive navigation_element 
                      ${styles.navigation_element}`}>История заказов</Link>
                    <Link to='/login' onClick={handleLogoutClick} className={`text text_type_main-medium text_color_inactive navigation_element mb-20 
                ${styles.navigation_element}`}>Выход</Link>
                    <p className="text text_type_main-small text_color_inactive">
                        В этом разделе вы можете <br/> изменить свои персональные данные
                    </p>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.profile_container}>
                        <NameInputComponent placeholder={'Имя'} icon={'EditIcon'}/>
                        <EmailInputComponent placeholder={"Логин"} isIcon={true}/>
                        <PasswordInput placeholder={"Пароль"}/>
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <Button htmlType="submit" type="primary" size="large" extraClass="mr-3">
                                Сохранить
                            </Button>
                            <Button htmlType="button" type="primary" size="large" extraClass="ml-2"
                                    onClick={handleCancelButtonClick}>
                                Отмена
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
