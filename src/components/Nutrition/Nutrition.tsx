import React from "react";
import styles from "./Nutrition.module.css";
import {NutritionItem} from "../NutritionItem/NutritionItem";
import {IProduct} from "../../models";


interface NutritionProps {
    product: IProduct;
}

export const Nutrition = ({ product }: NutritionProps) => {
    return (
        <div className={styles.Nutrition}>
            <NutritionItem title="Калории,ккал" value={product.calories} />
            <NutritionItem title="Белки,г" value={product.proteins} />
            <NutritionItem title="Жиры,г" value={product.fat} />
            <NutritionItem title="Углеводы,г" value={product.carbohydrates} />
        </div>
    );
};
