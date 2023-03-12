import React from 'react';
import styles from './BurgerIngredients.module.css'
import commonStyles from '../App/App.module.css'
import {IngredientsTitle} from "../IngredientsTitle/IngredientsTitle";
import {IngredientsItems} from "../IngredientsItems/IngredientsItems";
import {Tabs} from "../Tabs/Tabs";
import {IProduct} from "../../models";


interface ProductsProps {
    products: IProduct[];
}

export function BurgerIngredients({products}: ProductsProps) {
    return (
        <section className={`${styles.BurgerIngredients} pt-10 mr-10`}>
            <IngredientsTitle className="text_type_main-large">Соберите бургер</IngredientsTitle>
            <Tabs/>
            <section className={`${commonStyles.scrollContainer}`}>
                <IngredientsTitle className="text_type_main-medium mt-10">Булки</IngredientsTitle>
                <IngredientsItems products={products} type={'bun'}/>
                <IngredientsTitle className="text_type_main-medium mt-8">Соусы</IngredientsTitle>
                <IngredientsItems products={products} type={'sauce'}/>
                <IngredientsTitle className="text_type_main-medium mt-8">Начинки</IngredientsTitle>
                <IngredientsItems products={products} type={'main'}/>
            </section>
        </section>
    )
}
