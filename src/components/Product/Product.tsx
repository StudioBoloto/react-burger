import React, {useState} from "react";
import styles from "../Product/Product.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IProduct} from "../../models";

interface ProductProps {
    product: IProduct;
    quantity: number
}

export function Product({product, quantity}: ProductProps) {
    const [count, setCount] = useState(quantity);
    const handleClick = () => {
        setCount(count + 1);
    };
    return (
        <span className={`${styles.Product} mt-6 ml-4 mr-2 mb-2`} onClick={handleClick}>
            {count > 0 && <Counter count={count} size="default"/>}
            <span className="ml-4 mr-4">
                <img src={product.image} alt={product.name}/>
            </span>
            <span className={`${styles.ProductPrice} mt-1`}>
                <span className="text text_type_digits-default mr-2">{product.price}</span>
                <CurrencyIcon type="primary"/>
            </span>
            <span className={`${styles.ProductTitle} text text_type_main-default mt-1`}>
                {product.name}
            </span>
        </span>
    );
}