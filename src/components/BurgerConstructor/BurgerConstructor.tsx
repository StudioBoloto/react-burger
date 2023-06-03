import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './BurgerConstructor.module.css';
import {ProductItem} from "../ProductItem/ProductItem";
import {OrderDetails} from "../OrderDetails/OrderDetails";
import {data} from "../../utils/data";
import {
    Button,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {IOrder} from "../../models";
import {RootState} from '../../services/reducers/store';
import {DraggableContainer} from "../DraggableContainer/DraggableContainer";
import {useNavigate} from "react-router-dom";
import {clearOrder} from "../../services/actions/ingredientActions";
import Loader from "../Loader/Loader";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {createOrder} from "../../services/actions/orderActions";

interface OrderState {
    isLoading: boolean;
    hasError: boolean;
    order: {
        number: string;
    };
}

export function BurgerConstructor() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const orderState: OrderState = useSelector((state: RootState) => state.order);
    const ingredientsState = useSelector((state: RootState) => state.ingredients);
    const {isLoading, hasError, order} = orderState;
    const {totalPrice, ingredientsIds, basket, bun} = ingredientsState;
    const [isOpen, setIsOpen] = useState(false);
    const orderDetailsData: IOrder = {
        ...data[0],
        _id: order.number
    };
    const handleButtonClick = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        if (!bun) {
            return;
        }
        setIsOpen(true);
        const savedUserData = localStorage.getItem('userData');
        const userData = savedUserData ? JSON.parse(savedUserData) : null;
        const accessToken = userData.accessToken ?? '';
        dispatch(createOrder({ingredients:ingredientsIds, token: accessToken}) as any);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        dispatch(clearOrder());
    };

    return (
        <div className={`${styles.BurgerConstructor} pt-25 pl-4`}>
            <section className={styles.productSection}>
                <div className={`${styles.productElement} mr-2`} key={0}>
                    {bun && <ProductItem product={bun} type="top"/>}
                </div>
                <DraggableContainer/>
                <div className={`${styles.productElement} mr-2`} key={-1}>
                    {bun && <ProductItem product={bun} type="bottom"/>}
                </div>
            </section>
            <section className={`${styles.checkOutSection} mt-10`}>
                <section className={styles.totalSumSection}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </section>
                <Button htmlType="button" type="primary" size="medium" onClick={handleButtonClick}>
                    Оформить заказ
                </Button>
            </section>
            <div style={{overflow: 'hidden'}}>
                {isLoading && <Loader/>}
                {isOpen && <OrderDetails
                    data={orderDetailsData}
                    onClose={handleCloseModal}
                />}
            </div>
        </div>
    )
}
