import React, {useMemo, useState} from "react";
import {IProduct} from "../../models";
import styles from "../IngredientsItems/IngredientsItems.module.css";
import {Product} from "../Product/Product";
import {IngredientDetails} from '../IngredientDetails/IngredientDetails'


interface ProductsProps {
    products: IProduct[];
    type?: string | undefined;
}

export const IngredientsItems = ({products, type}: ProductsProps) => {
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const filteredProducts = useMemo(() => products.filter(product => product.type === type),
        [products, type]);

    const handleProductClick = (product: IProduct) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsOpen(false);
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
                {isOpen && selectedProduct && <IngredientDetails
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    isOpen={isOpen}
                />}
            </div>
        </div>
    )
}
