import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.overlay}></div>
        </div>
    );
};

export default Loader;
