import styles from './App.module.css'
import React, {useEffect} from "react";
import {getIngredients} from "../../services/Api";
import {useDispatch, useSelector} from 'react-redux';
import {getProductsFailure, getProductsRequest, getProductsSuccess} from "../../services/actions/productActions";
import {RootState} from '../../services/reducers/store';
import DragAndDropContainer from "../DragAndDropContainer/DragAndDropContainer";
import {Outlet} from "react-router-dom";

export function App() {
    const {isLoading, hasError, products} = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsRequest());
        getIngredients().then((data) => {
            dispatch(getProductsSuccess(data));
        }).catch((error) => {
            dispatch(getProductsFailure(error));
        });
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
