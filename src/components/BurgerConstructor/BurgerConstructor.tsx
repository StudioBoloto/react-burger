import React, {useMemo} from 'react';
import styles from './BurgerConstructor.module.css';
import commonStyles from '../App/App.module.css'
import {ProductItem} from "../ProductItem/ProductItem";
import {products} from "../../utils/data";
import {
    Button,
    CurrencyIcon,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'


export function BurgerConstructor() {
    const totalPrice = useMemo(() => {
        return products.reduce((total, product) => {
            return total + product.price;
        }, 0);
    }, []);
    const middleProducts = products.slice(1, -1);
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
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </section>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </section>
        </div>
    )
}
