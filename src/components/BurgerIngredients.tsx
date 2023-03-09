import React, {useState} from 'react';
import styles from './BurgerIngredients.module.css'
import {
    CurrencyIcon,
    Counter,
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components'
import {IProduct} from "../models";
import {products} from "../utils/data";


const Tabs = () => {
    const [current, setCurrent] = React.useState('bun');
    return (
        <nav className='mt-5' style={{display: 'flex'}}>
            <Tab value='bun' active={current === 'bun'} onClick={() => setCurrent('bun')} children='Булки'/>
            <Tab value='sauce' active={current === 'sauce'} onClick={() => setCurrent('sauce')} children='Соусы'/>
            <Tab value='main' active={current === 'main'} onClick={() => setCurrent('main')} children='Начинки'/>
        </nav>
    );
};

interface IngredientsTitleProps {
    children: React.ReactNode;
    className?: string | undefined;
}

const IngredientsTitle = (props: IngredientsTitleProps) => {
    return (
        <section>
            <p className={`text ${props.className}`}>
                {props.children}
            </p>
        </section>
    )
}

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

interface ProductsProps {
    products: IProduct[];
    type?: string | undefined;
}

const IngredientsItems = ({products, type}: ProductsProps) => {
    return (
        <div className={styles.IngredientsItems}>
            {products.map((product) => (
                product.type === type &&
                <span key={product._id}>
                        <Product product={product} quantity={Math.round(Math.random())}/>
                    </span>
            ))}
        </div>
    )
}

export function BurgerIngredients() {
    return (
        <section className={`${styles.BurgerIngredients} pt-10 mr-10`}>
            <IngredientsTitle className="text_type_main-large">Соберите бургер</IngredientsTitle>
            <Tabs/>
            <IngredientsTitle className="text_type_main-medium mt-10">Булки</IngredientsTitle>
            <IngredientsItems products={products} type={'bun'}/>
            <IngredientsTitle className="text_type_main-medium mt-8">Соусы</IngredientsTitle>
            <IngredientsItems products={products} type={'sauce'}/>
            <IngredientsTitle className="text_type_main-medium mt-8">Начинки</IngredientsTitle>
            <IngredientsItems products={products} type={'main'}/>
        </section>
    )
}
