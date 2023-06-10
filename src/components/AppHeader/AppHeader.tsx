import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import styles from './AppHeader.module.css'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import {getUser} from "../../services/actions/userActions";
import {changeName} from "../../services/actions/nameActions";
import {changeEmail} from "../../services/actions/emailActions";
import {getProducts} from "../../services/actions/productActions";
import {useDispatch, useSelector} from "../../services/hooks";

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
    const dispatch = useDispatch();
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

    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        const token = localStorage.getItem('accessToken') ?? '';
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            const accessToken = userData.accessToken ?? '';
            dispatch(getUser({token: accessToken}));

            dispatch(changeName(userData.user.name));
            dispatch(changeEmail(userData.user.email));

        } else if (token) {
            dispatch(getUser({token: token}));
        } else {return}
    }, [dispatch]);

    const {products} = useSelector((state) => state.products);
    useEffect(() => {
        if (!products.length) {
            dispatch(getProducts());
        }
    }, [dispatch, products.length]);

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
