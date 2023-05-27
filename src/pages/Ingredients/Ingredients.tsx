import styles from "../Pages.module.css";
import React from "react";
import {IngredientDetails} from "../../components/IngredientDetails/IngredientDetails";
import {IProduct} from "../../models";

interface IngredientProps {
    product: IProduct;
}

export const Ingredients = ({product}: IngredientProps) => {
    return (
        <div className={styles.wrapper}>
            <div className="mt-30">
                <IngredientDetails product={product}/>
            </div>
        </div>
    )
}
