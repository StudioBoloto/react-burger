import React, {useMemo, useState} from "react";
import {IProduct} from "../../models";
import styles from "../IngredientsItems/IngredientsItems.module.css";
import {Product} from "../Product/Product";
import {IngredientDetails} from '../IngredientDetails/IngredientDetails'
import {Modal} from "../Modal/Modal";

interface ProductsProps {
    products: IProduct[];
    type?: string | undefined;
}

export const IngredientsItems = ({products, type}: ProductsProps) => {
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const filteredProducts = useMemo(() => products.filter(product => product.type === type),
        [products, type]);

    const handleProductClick = (product: IProduct) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className={styles.IngredientsItems}>
            {filteredProducts.map((product) => (
                <span key={product._id}>
                        <Product product={product}
                                 quantity={Math.round(Math.random())}
                                 onClick={() => handleProductClick(product)}/>
                    </span>
            ))}
            <div style={{overflow: 'hidden'}}>
                {selectedProduct &&
                    <Modal header="Детали ингредиента" onClose={handleCloseModal}>
                        <IngredientDetails product={selectedProduct}/>
                    </Modal>
                }
            </div>
        </div>
    )
}
