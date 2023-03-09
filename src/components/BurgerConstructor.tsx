import React from 'react';
import styles from './BurgerConstructor.module.css'
import {IProduct} from "../models";
import {products} from "../utils/data";
import {
    Button,
    CurrencyIcon,
    DragIcon,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components'

interface ProductProps {
    product: IProduct
    type?: "top" | "bottom" | undefined;
}

export function Product({product, type}: ProductProps) {
    return (
        <ConstructorElement
            type={type}
            isLocked={true}
            text={product.name}
            price={product.price}
            thumbnail={product.image}
        />
    )
}

export function BurgerConstructor() {
    const totalPrice = products.reduce((total, product) => {
        return total + product.price;
    }, 0);
    return (
        <div className={`${styles.BurgerConstructor} pt-25 pl-4`}>
            {products.map((product, index) => (
                <div className={styles.productSection} key={product._id}>
                    {index !== 0 && index !== products.length - 1 && <DragIcon type="secondary"/>}
                    <Product product={product}
                             type={index === 0 ? 'top' : index === products.length - 1 ? 'bottom' : undefined}/>
                </div>
            ))}
            <div className={`${styles.checkOutSection} mt-10`}>
                <div className={styles.totalSumSection}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}
