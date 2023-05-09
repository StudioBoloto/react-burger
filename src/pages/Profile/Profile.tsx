import styles from "../Pages.module.css";
import {AppHeader} from "../../components/AppHeader/AppHeader";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import EmailInputComponent from "../../components/EmailInputComponent/EmailInputComponent";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {updateProfile} from "../../services/actions/profileActions";
import {logoutUser, updateUser} from "../../services/Api";
import NameInputComponent from "../../components/NameInputComponent";
import {changeName} from "../../services/actions/nameActions";
import {changeEmail} from "../../services/actions/emailActions";

export const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {name} = useSelector((state: RootState) => state.name);
    const {email} = useSelector((state: RootState) => state.email);
    const {password} = useSelector((state: RootState) => state.password);
    const {currentEmail, currentName} = useSelector((state: RootState) => state.profile);

    const handleSaveButtonClick = () => {
        updateUser({email: email, password: password, name: name}).then((data) => {
            dispatch(updateProfile({currentEmail: data.user.email, currentName: data.user.name}));
            dispatch(changeName(data.user.name));
            dispatch(changeEmail(data.user.email));
            // navigate("/");
            console.log(data);
        }).catch((error) => {
            //dispatch(updateProfileFailure(error));
        });
    }
    const handleCancelButtonClick = () => {
        dispatch(changeName(currentName));
        dispatch(changeEmail(currentEmail));
    }

    const handleLogoutClick = () => {
        const token = localStorage.getItem("refreshToken") ?? "";
        logoutUser({token})
            .then(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(updateProfile({currentEmail: "", currentName: ""}));
                navigate("/login");
            })
            .catch((error: Error) => {
                console.error(error);
            });
    };

    return (
        <div className={styles.wrapper}>
            <AppHeader selected={"Личный кабинет"}/>
            <div className={styles.profile_wrapper}>
                <div className={styles.navigation}>
                    <Link to='/profile' className={`text text_type_main-medium 
                ${styles.navigation_element}`}>Профиль</Link>
                    <Link to='*' className={`text text_type_main-medium text_color_inactive navigation_element 
                      ${styles.navigation_element}`}>История заказов</Link>
                    <Link to='/login' onClick={handleLogoutClick} className={`text text_type_main-medium text_color_inactive navigation_element mb-20 
                ${styles.navigation_element}`}>Выход</Link>
                    <p className="text text_type_main-small text_color_inactive">
                        В этом разделе вы можете <br/> изменить свои персональные данные
                    </p>
                </div>
                <div className={styles.profile_container}>
                    <NameInputComponent placeholder={'Имя'} icon={'EditIcon'}/>
                    <EmailInputComponent placeholder={"Логин"} isIcon={true}/>
                    <PasswordInput placeholder={"Пароль"}/>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button htmlType="button" type="primary" size="large" extraClass="mr-3"
                                onClick={handleSaveButtonClick}>
                            Сохранить
                        </Button>
                        <Button htmlType="button" type="primary" size="large" extraClass="ml-2"
                                onClick={handleCancelButtonClick}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
