import {IProduct} from "../../models";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

interface ProductProps {
    product: IProduct
    type?: "top" | "bottom" | undefined;
    onClick?: (product: IProduct) => void;
}

export function ProductItem({product, type, onClick}: ProductProps) {
    const text =
        type === "top"
            ? `${product.name} (верх)`
            : type === "bottom"
                ? `${product.name} (низ)`
                : product.name;
    return (
        <ConstructorElement
            type={type}
            isLocked={!!type}
            text={text}
            price={product.price}
            thumbnail={product.image}
            handleClose={() => onClick ? onClick(product) : undefined}
        />
    )
}
