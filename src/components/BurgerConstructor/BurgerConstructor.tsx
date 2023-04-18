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
import {createOrder} from "../../services/Api";
import {RootState} from '../../services/reducers/store';
import {postOrderFailure, postOrderRequest, postOrderSuccess} from "../../services/actions/orderActions";
//@ts-ignore
import {v4 as uuid} from 'uuid';
import {DraggableContainer} from "../DraggableContainer/DraggableContainer";

interface OrderState {
    isLoading: boolean;
    hasError: boolean;
    order: {
        number: string;
    };
}

export function BurgerConstructor() {
    const dispatch = useDispatch();
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
        setIsOpen(true);
        dispatch(postOrderRequest());
        createOrder(ingredientsIds).then((data) => {
            dispatch(postOrderSuccess(data));
        }).catch((error) => {
            dispatch(postOrderFailure(error));
        });
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={`${styles.BurgerConstructor} pt-25 pl-4`}>
            <section className={styles.productSection}>
                <div className={`${styles.productElement} mr-2`} key={uuid()}>
                    {bun && <ProductItem product={bun} type="top"/>}
                </div>
                <DraggableContainer/>
                <div className={`${styles.productElement} mr-2`} key={uuid()}>
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
                {isOpen && <OrderDetails
                    data={orderDetailsData}
                    onClose={handleCloseModal}
                />}
            </div>
        </div>
    )
}
