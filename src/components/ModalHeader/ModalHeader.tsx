import React from "react";
import styles from './ModalHeader.module.css'

interface ModalHeaderProps {
    children: React.ReactNode;
    className?: string | undefined;
}

export const ModalHeader = (props: ModalHeaderProps) => {
    return (
        <section className={`${styles.ModalHeader} mt-10 mr-10 ml-10 mb-0`}>
            <p className={`text ${props.className}`}>
                {props.children}
            </p>
        </section>
    )
}
