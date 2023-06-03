import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {getProducts} from "../../services/actions/productActions";
import {Modal} from "../Modal/Modal";
import {NotFound404} from "../../pages/NotFound404/NotFound404";
import {OrderInfo} from "../OrderInfo/OrderInfo";


export const OrdersInfoWrapper = () => {
    const {id} = useParams<{ id: string }>();
    const orders = useSelector((state: RootState) => state.orders);
    const ordersInfo = orders.allOrders;
    const {products} = useSelector((state: RootState) => state.products);
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!products.length) {
            dispatch(getProducts());
        }
    }, [dispatch, products.length]);
    const order = ordersInfo?.orders.find((order) => order._id === id);
    const modal = location.state?.modal;

    const closeModal = () => {
        console.log("closing modal and navigating to ", location.state?.from)
        navigate(location.state?.from || "/feed");
    }
    if (modal && order) {
        return (
            <div style={{overflow: 'hidden'}}>
                <Modal onClose={closeModal}>
                    <OrderInfo order={order} isModal={modal}/>
                </Modal>
            </div>
        );
    } else if (!modal && order) {
        return (
            <OrderInfo order={order}/>
        );
    }
    return (
        <NotFound404/>
    );
};
