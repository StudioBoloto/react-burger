import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import styles from './AppHeader.module.css'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch} from "react-redux";
import {getUser} from "../../services/actions/userActions";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../services/reducers/store";
import {AnyAction} from "redux";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
    elementIcon?: React.ReactNode;
    link?: string | undefined
}

const HeaderElement = (props: HeaderProps) => {
    const handleClick = () => {
        if (props.link) {
            window.location.href = props.link;
        }
    };
    return (
        <div onClick={handleClick}
             className={`${styles.AppHeader} ${styles.HeaderElement} pt-4 pb-4 pl-5 pr-5 mt-4 mb-4`}>
            {props.elementIcon}
            <p className={`text text_type_main-default ml-2 ${props.className}`}>
                {props.children}
            </p>
        </div>
    )
}

export function AppHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const selected = (): string => {
        if (path === "/") {
            return "Конструктор";
        } else if (path === "/feed") {
            return "Лента заказов";
        } else if (path === "/register" || path === "/login" || path === "/forgot-password" ||
            path === "/reset-password" || path === "/profile") {
            return "Личный кабинет";
        } else {
            return "";
        }
    };
    const isSelected = (title: string) => {
        return (selected() !== title) ? "text_color_inactive" : "";
    };

    const handleLogoClick = () => {
        navigate('/');
    }

    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        const token = localStorage.getItem('accessToken') ?? '';
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            const accessToken = userData.accessToken ?? '';
            dispatch(getUser({token: accessToken}));
        } else if (token) {
            dispatch(getUser({token: token}));
        } else {return}
    }, [dispatch]);

    return (
        <header
            className={`${styles.AppHeader} ${styles.header} mt-10`}>
            <nav className={`${styles.AppHeader} ${styles.nav}`}>
                <Link to="/">
                    <HeaderElement className={isSelected("Конструктор")} elementIcon={<BurgerIcon type="secondary"/>}>
                        Конструктор</HeaderElement>
                </Link>
                <Link to="/feed">
                    <HeaderElement className={isSelected("Лента заказов")} elementIcon={<ListIcon type="secondary"/>}>
                        Лента заказов</HeaderElement>
                </Link>
            </nav>
            <div className="pr-30 mr-10" onClick={handleLogoClick}>
                <Logo/>
            </div>
            <Link to="/profile">
                <HeaderElement className={isSelected("Личный кабинет")} elementIcon={<ProfileIcon type="secondary"/>}>
                    Личный кабинет</HeaderElement>
            </Link>
        </header>
    );
}
