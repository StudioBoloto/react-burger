import styles from './App.module.css'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from "../../services/actions/productActions";
import {RootState} from '../../services/reducers/store';
import DragAndDropContainer from "../DragAndDropContainer/DragAndDropContainer";
import {Outlet} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export function App() {
    const {products, isLoading, hasError} = useSelector((state: RootState) => state.products);
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

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
