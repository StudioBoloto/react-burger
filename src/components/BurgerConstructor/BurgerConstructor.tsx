import React, {useContext, useMemo, useState, useReducer, useEffect} from 'react';
import styles from './BurgerConstructor.module.css';
import commonStyles from '../App/App.module.css'
import {ProductItem} from "../ProductItem/ProductItem";
import {OrderDetails} from "../OrderDetails/OrderDetails";
import {data} from "../../utils/data";
import {
    Button,
    CurrencyIcon,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import {ProductsContext} from "../../services/productsContext";
import {IOrder, IProduct} from "../../models";
import {createOrder} from "../Api";

interface State {
    totalPrice: number;
    ingredientsIds: string[];
}

interface Action {
    type: string;
    product: IProduct;
}

export function BurgerConstructor() {
    const products = useContext(ProductsContext);
    const initialState = {totalPrice: 0, ingredientsIds: []};
    const [isOpen, setIsOpen] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [orderId, setOrderId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    function reducer(state: State, action: Action) {
        switch (action.type) {
            case 'increment':
                return {
                    totalPrice: state.totalPrice + action.product.price,
                    ingredientsIds: [...state.ingredientsIds, action.product._id]
                };
            case 'decrement':
                return {
                    totalPrice: state.totalPrice - action.product.price,
                    ingredientsIds: state.ingredientsIds.filter(id => id !== action.product._id)
                };
            default:
                console.log(`Wrong type of action: ${action.type}`);
                return state;
        }
    }

    useEffect(() => {
        products.map((product) => dispatch({type: 'increment', product: product}))
    }, []);
    const middleProducts = products.slice(1, -1);

    const orderDetailsData: IOrder = {
        ...data[0],
        _id: orderId
    };

    const handleButtonClick = () => {
        setIsOpen(true);
        setIsLoading(true);
        createOrder(state.ingredientsIds)
            .then((data) => {
                setOrderId(data.order.number.toString());
                setIsLoading(false);
            })
            .catch(e => {
                setHasError(true);
                setIsLoading(false);
            });
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={`${styles.BurgerConstructor} pt-25 pl-4`}>
            <section className={styles.productSection}>
                <div className={`${styles.productElement} mr-2`} key={products[0]._id}>
                    <ProductItem product={products[0]} type="top"/>
                </div>
                <div className={`${commonStyles.scrollContainer} ${commonStyles.scrollContainerSmall}`}>
                    {middleProducts.map((product) => (
                        <div className={`${styles.productElement} ${styles.productElementWide}`} key={product._id}>
                            <DragIcon type="secondary"/>
                            <ProductItem product={product}/>
                        </div>
                    ))}
                </div>
                <div className={`${styles.productElement} mr-2`} key={products[products.length - 1]._id}>
                    <ProductItem product={products[products.length - 1]} type="bottom"/>
                </div>
            </section>
            <section className={`${styles.checkOutSection} mt-10`}>
                <section className={styles.totalSumSection}>
                    <p className="text text_type_digits-medium">{state.totalPrice}</p>
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
