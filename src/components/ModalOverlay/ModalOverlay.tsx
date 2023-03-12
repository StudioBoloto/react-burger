import styles from './ModalOverlay.module.css'
import React from "react";

interface ModalOverlayProps {
    onClose: () => void;
}

export const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
    return (
        <div className={styles.ModalOverlay} onClick={onClose}>
        </div>
    );
};
