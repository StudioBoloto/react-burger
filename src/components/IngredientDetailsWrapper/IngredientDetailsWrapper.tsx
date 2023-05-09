import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Modal} from "../Modal/Modal";
import {IngredientDetails} from "../IngredientDetails/IngredientDetails";
import React from "react";
import {Ingredients} from "../../pages/Ingredients/Ingredients";
import {NotFound404} from "../../pages/NotFound404/NotFound404";
import {IProduct} from "../../models";

export const IngredientDetailsWrapper = () => {
    const {id} = useParams<{ id: string }>();
    const products: IProduct[] = JSON.parse(localStorage.getItem('products') || '[]');
    const ingredient = products.find((product) => product._id === id);
    const isModalOpen = localStorage.getItem("modalOpen") === "true";
    const location = useLocation();
    const navigate = useNavigate();
    const isModal = location.state && location.state.modal;

    const closeModal = () => {
        localStorage.removeItem("modalOpen");
        navigate("/");
    }

    if (isModal && isModalOpen && ingredient) {
        return (
            <div style={{overflow: 'hidden'}}>
                <Modal header="Детали ингредиента" onClose={closeModal}>
                    <IngredientDetails product={ingredient}/>
                </Modal>
            </div>
        );
    } else if (ingredient && !isModalOpen) {
        return (
            <Ingredients product={ingredient}/>
        );
    }
    return (
        <NotFound404/>
    );
};
