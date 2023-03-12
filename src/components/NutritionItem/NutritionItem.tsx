import React from "react";
import styles from "./NutritionItem.module.css";


interface NutritionItemProps {
    title: string;
    value: number;
}

export const NutritionItem = ({title, value}: NutritionItemProps) => {
    return (
        <div className={styles.NutritionItem}>
            <p className='text text_type_main-default text_color_inactive mb-2'>{title}</p>
            <p className='text text_type_digits-default text_color_inactive'>{value}</p>
        </div>
    );
};
