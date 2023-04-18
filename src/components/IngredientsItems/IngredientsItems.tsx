import React, {useMemo} from "react";
import {IProduct} from "../../models";
import styles from "../IngredientsItems/IngredientsItems.module.css";
import {IngredientDetails} from '../IngredientDetails/IngredientDetails'
import {Modal} from "../Modal/Modal";
import {DraggableIngredient} from "../DraggableIngredient/DraggableIngredient";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {getIngredientInfo} from "../../services/actions/ingredientDetailsActions";

interface ProductsProps {
    products: IProduct[];
    type?: string | undefined;
}

export const IngredientsItems = ({products, type}: ProductsProps) => {
    const dispatch = useDispatch();
    const {ingredient} = useSelector((state: RootState) => state.ingredientDetails);
    const filteredProducts = useMemo(() => products.filter(product => product.type === type),
        [products, type]);

    const handleProductClick = (product: IProduct) => {
        dispatch(getIngredientInfo(product));
    };

    const handleCloseModal = () => {
        dispatch(getIngredientInfo(undefined));
    };

    return (
        <div className={styles.IngredientsItems}>
            {filteredProducts.map((product) => (
                <span key={product._id}>
                    <DraggableIngredient product={product}
                                         onClick={() => handleProductClick(product)}/>
                    </span>
            ))}
            <div style={{overflow: 'hidden'}}>
                {ingredient &&
                    <Modal header="Детали ингредиента" onClose={handleCloseModal}>
                        <IngredientDetails product={ingredient}/>
                    </Modal>
                }
            </div>
        </div>
    )
}
