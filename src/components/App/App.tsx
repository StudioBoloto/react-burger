import styles from './App.module.css'
import {AppHeader} from "../AppHeader/AppHeader";
import {BurgerIngredients} from "../BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "../BurgerConstructor/BurgerConstructor";
import {useEffect, useState} from "react";
import {getIngredients} from "../../services/Api";
import {ProductsContext} from "../../services/productsContext";

function App() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getIngredients().then((data) => {
            setProducts(data);
            setIsLoading(false);
        })
            .catch(e => {
                setHasError(true);
                setIsLoading(false);
            });
    }, []);

    return (
        <ProductsContext.Provider value={products}>
            {!isLoading && !hasError && products.length && (
                <div className={`${styles.App} ${styles.page}`}>
                    <AppHeader/>
                    <main className={`${styles.App} mb-10`}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </main>
                </div>
            )}
        </ProductsContext.Provider>
    );
}

export default App;
