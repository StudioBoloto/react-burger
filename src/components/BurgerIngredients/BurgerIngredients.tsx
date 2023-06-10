import React, {useEffect, useRef} from 'react';
import styles from './BurgerIngredients.module.css'
import commonStyles from '../App/App.module.css'
import {IngredientsTitle} from "../IngredientsTitle/IngredientsTitle";
import {IngredientsItems} from "../IngredientsItems/IngredientsItems";
import {Tabs} from "../Tabs/Tabs";
import {updateProductCount} from "../../services/actions/productActions";
import {useDispatch, useSelector} from "../../services/hooks";

export function BurgerIngredients() {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const {ingredientsIds} = useSelector((state) => state.ingredients);
    useEffect(() => {
        const updatedProducts = products.map((product) => {
            const count = ingredientsIds.filter((id) => id === product._id).length;
            return {...product, count: count};
        });
        dispatch(updateProductCount(updatedProducts));
    }, [ingredientsIds]);

    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);
    return (
        <section className={`${styles.BurgerIngredients} pt-10 mr-10`}>
            <IngredientsTitle className="text_type_main-large">Соберите бургер</IngredientsTitle>
            <Tabs bunsRef={bunsRef} saucesRef={saucesRef} mainsRef={mainsRef}/>
            <section className={`${commonStyles.scrollContainer}`} id={'scrollContainer'}>
                <div ref={bunsRef}>
                    <IngredientsTitle className="text_type_main-medium mt-10">Булки</IngredientsTitle>
                    <IngredientsItems products={products} type={'bun'}/>
                </div>
                <div ref={saucesRef}>
                    <IngredientsTitle className="text_type_main-medium mt-8">Соусы</IngredientsTitle>
                    <IngredientsItems products={products} type={'sauce'}/>
                </div>
                <div ref={mainsRef}>
                    <IngredientsTitle className="text_type_main-medium mt-8">Начинки</IngredientsTitle>
                    <IngredientsItems products={products} type={'main'}/>
                </div>
            </section>
        </section>
    )
}
