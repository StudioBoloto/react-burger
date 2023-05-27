import React from 'react';
import {Link} from 'react-router-dom';

import styles from './not-found.module.css';

export const NotFound404 = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className="text text_type_main-large">Oops! <span className="text text_type_digits-medium">
                        {404}</span> Error</h1>
                    <br/>
                    <p className="text text_type_main-medium">The page you requested does not exist</p>
                    <br/>
                    <br/>
                    <p className="text text_type_main-medium">
                        check the address or try <Link to='/' className={styles.link}>homepage</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
