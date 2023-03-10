import {IProduct} from "../../models";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

interface ProductProps {
    product: IProduct
    type?: "top" | "bottom" | undefined;
}

export function ProductItem({product, type}: ProductProps) {
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
