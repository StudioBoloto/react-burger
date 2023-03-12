import {IProduct} from "../../models";
import styles from "./IngredientDetails.module.css"
import {Modal} from "../Modal/Modal";
import React from "react";
import {Nutrition} from "../Nutrition/Nutrition";

interface IngredientModalProps {
    product: IProduct;
    onClose: () => void;
    isOpen: boolean;
}

export const IngredientDetails = ({product, onClose, isOpen}: IngredientModalProps) => {
    return (
        <Modal header="Детали ингредиента" onClose={onClose} isOpen={isOpen}>
            <div className={`${styles.IngredientDetails} mb-15`}>
                <div className={styles.Image}>
                    <img className='ml-5 mr-5 mb-4' src={product.image_large} alt={product.name}/>
                </div>
                <p className='text text_type_main-medium mb-8'>{product.name}</p>
                <Nutrition product={product}/>
            </div>
        </Modal>
    )
}
