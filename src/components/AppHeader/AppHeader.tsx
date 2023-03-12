import React from "react";
import styles from './AppHeader.module.css'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'


interface HeaderProps {
    children: React.ReactNode;
    className?: string;
    elementIcon?: React.ReactNode;
    link?: string | undefined
}

const HeaderElement = (props: HeaderProps) => {
    return (
        <a href={props.link} className={`${styles.AppHeader} ${styles.HeaderElement} pt-4 pb-4 pl-5 pr-5 mt-4 mb-4`}>
            {props.elementIcon}
            <p className={`text text_type_main-default ml-2 ${props.className}`}>
                {props.children}
            </p>
        </a>
    )
}

export function AppHeader() {
    return (
        <header
            className={`${styles.AppHeader} ${styles.header} mt-10`}>
            <nav className={`${styles.AppHeader} ${styles.nav}`}>
                <HeaderElement elementIcon={<BurgerIcon type="secondary"/>}>Конструктор</HeaderElement>
                <HeaderElement className="text_color_inactive" elementIcon={<ListIcon type="secondary"/>}>
                    Лента заказов</HeaderElement>
            </nav>
            <div className="pr-30 mr-10"><Logo/></div>
            <HeaderElement className="text_color_inactive" elementIcon={<ProfileIcon type="secondary"/>}>
                Личный кабинет</HeaderElement>
        </header>
    );
}