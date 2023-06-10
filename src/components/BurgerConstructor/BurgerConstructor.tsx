import React, {useState} from 'react';
import styles from './BurgerConstructor.module.css';
import {ProductItem} from "../ProductItem/ProductItem";
import {OrderDetails} from "../OrderDetails/OrderDetails";
import {
    Button,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {DraggableContainer} from "../DraggableContainer/DraggableContainer";
import {useNavigate} from "react-router-dom";
import {clearOrder} from "../../services/actions/ingredientActions";
import {createOrder} from "../../services/actions/orderActions";
import {useDispatch, useSelector} from "../../services/hooks";

export function BurgerConstructor() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ingredientsState = useSelector((state) => state.ingredients);
    const {totalPrice, ingredientsIds, basket, bun} = ingredientsState;
    const [isOpen, setIsOpen] = useState(false);

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
        dispatch(createOrder({ingredients: ingredientsIds, token: accessToken}) as any);
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
                {isOpen && <OrderDetails
                    onClose={handleCloseModal}
                />}
            </div>
        </div>
    )
}
