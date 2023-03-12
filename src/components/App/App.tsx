import styles from './App.module.css'
import {AppHeader} from "../AppHeader/AppHeader";
import {BurgerIngredients} from "../BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "../BurgerConstructor/BurgerConstructor";
import {useEffect, useState} from "react";

function App() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => res.json())
            .then(data => {
                setProducts(data.data);
                setIsLoading(false);
            })
            .catch(e => {
                setHasError(true);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (isLoading) {
            console.log('Загрузка...');
        }
        if (hasError) {
            console.log('Произошла ошибка');
        }
    }, [isLoading, hasError]);
    return (
        <>
            {!isLoading && !hasError && products.length && (
                <div className={`${styles.App} ${styles.page}`}>
                    <AppHeader/>
                    <main className={`${styles.App} mb-10`}>
                        <BurgerIngredients products={products}/>
                        <BurgerConstructor products={products}/>
                    </main>
                </div>
            )}
        </>
    );
}

export default App;
