import styles from './App.module.css'
import React from "react";
import DragAndDropContainer from "../DragAndDropContainer/DragAndDropContainer";
import {Outlet} from "react-router-dom";
import {useSelector} from "../../services/hooks";

export function App() {
    const {products, isLoading, hasError} = useSelector((state) => state.products);
    return (
        <>
            {!isLoading && !hasError && products.length && (
                <div className={`${styles.App} ${styles.page}`}>
                    <main className={`${styles.App} mb-10`}>
                        <DragAndDropContainer/>
                    </main>
                </div>
            )}
            <Outlet/>
        </>
    );
}
