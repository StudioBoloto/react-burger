import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Modal} from "../Modal/Modal";
import {IngredientDetails} from "../IngredientDetails/IngredientDetails";
import React, {useEffect} from "react";
import {Ingredients} from "../../pages/Ingredients/Ingredients";
import {NotFound404} from "../../pages/NotFound404/NotFound404";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getProducts} from "../../services/actions/productActions";

export const IngredientDetailsWrapper = () => {
    const {id} = useParams<{ id: string }>();
    const {products} = useSelector((state: RootState) => state.products);
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!products.length) {
            dispatch(getProducts());
        }
    }, [dispatch, products.length]);

    const ingredient = products.find((product) => product._id === id);
    const modal = location.state?.modal;

    const closeModal = () => {
        navigate("/");
    }

    if (modal && ingredient) {
        return (
            <div style={{overflow: 'hidden'}}>
                <Modal header="Детали ингредиента" onClose={closeModal}>
                    <IngredientDetails product={ingredient}/>
                </Modal>
            </div>
        );
    } else if (!modal && ingredient) {
        return (
            <Ingredients product={ingredient}/>
        );
    }
    return (
        <NotFound404/>
    );
};
