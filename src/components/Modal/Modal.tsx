import React, {KeyboardEventHandler, useEffect, useRef} from "react";
import {createPortal} from 'react-dom';
import {ModalHeader} from '../ModalHeader/ModalHeader'
import {ModalOverlay} from '../ModalOverlay/ModalOverlay'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css'

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface ModalProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
}

export const Modal = (props: ModalProps) => {
    const {children, header, onClose, isOpen} = props;
    const modalRef = useRef<HTMLDivElement>(null);

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.focus();
        }
    }, []);

    return createPortal(
        isOpen ? (
            <>
                <div className={styles.Modal} onKeyDown={handleKeyDown} ref={modalRef} tabIndex={0}>
                    <div className={styles.CloseIcon}>
                        <CloseIcon onClick={onClose} type="primary"/>
                    </div>
                    {header && <ModalHeader className="text_type_main-large">
                        {header}
                    </ModalHeader>}
                    {children}
                </div>
                <ModalOverlay onClose={onClose}/>
            </>
        ) : null,
        modalRoot
    );
}
