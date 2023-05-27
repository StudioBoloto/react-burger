import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}/>
            <div className={styles.overlay}/>
        </div>
    );
};

export default Loader;
