import React from "react";
import {Link} from 'react-router-dom';
import styles from './AppHeader.module.css'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

interface AppHeaderProps {
    selected?: string;
}

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
        <div onClick={handleClick} className={`${styles.AppHeader} ${styles.HeaderElement} pt-4 pb-4 pl-5 pr-5 mt-4 mb-4`}>
            {props.elementIcon}
            <p className={`text text_type_main-default ml-2 ${props.className}`}>
                {props.children}
            </p>
        </div>
    )
}

export function AppHeader({selected}: AppHeaderProps) {
    const isSelected = (title: string) => {
        return (selected !== title) ? "text_color_inactive" : "";
    };
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
            <div className="pr-30 mr-10">
                <Logo/>
            </div>
            <Link to="/login">
                <HeaderElement className={isSelected("Личный кабинет")} elementIcon={<ProfileIcon type="secondary"/>}>
                    Личный кабинет</HeaderElement>
            </Link>
        </header>
    );
}
