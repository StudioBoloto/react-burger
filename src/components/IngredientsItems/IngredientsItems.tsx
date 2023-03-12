import React, {useMemo} from "react";
import {IProduct} from "../../models";
import styles from "../IngredientsItems/IngredientsItems.module.css";
import {Product} from "../Product/Product";

interface ProductsProps {
    products: IProduct[];
    type?: string | undefined;
}

export const IngredientsItems = ({products, type}: ProductsProps) => {
    const filteredProducts = useMemo(() => products.filter(product => product.type === type),
        [products, type]);
    return (
        <div className={styles.IngredientsItems}>
            {filteredProducts.map((product) => (
                <span key={product._id}>
                        <Product product={product} quantity={Math.round(Math.random())}/>
                    </span>
            ))}
        </div>
    )
}