import React, {useMemo} from "react";
import {IProduct} from "../../models";
import styles from "../IngredientsItems/IngredientsItems.module.css";
import {DraggableIngredient} from "../DraggableIngredient/DraggableIngredient";
import {getIngredientInfo} from "../../services/actions/ingredientDetailsActions";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "../../services/hooks";

interface ProductsProps {
    products: IProduct[];
    type?: string | undefined;
}

export const IngredientsItems = ({products, type}: ProductsProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filteredProducts = useMemo(() => products.filter(product => product.type === type),
        [products, type]);

    const handleOpenModal = (product: IProduct) => {
        dispatch(getIngredientInfo(product));
        navigate(`/ingredients/${product._id}`, { state: { modal: true, background: location } });
    }

    return (
        <div className={styles.IngredientsItems}>
            {filteredProducts.map((product) => (
                <span key={product._id}>
                    <DraggableIngredient product={product}
                                         onClick={() => handleOpenModal(product)}/>
                    </span>
            ))}
        </div>
    )
}
