import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getProducts} from "../../services/actions/productActions";
import {Modal} from "../Modal/Modal";
import {NotFound404} from "../../pages/NotFound404/NotFound404";
import {OrderInfo} from "../OrderInfo/OrderInfo";
import {closeConnection, setConnection} from "../../services/reducers/orderSlice";
import {config} from "../../services/Api";
import Loader from "../Loader/Loader";


export const OrdersInfoWrapper = () => {
    const {id} = useParams<{ id: string }>();
    const orders = useSelector((state: RootState) => state.orders);
    const {products} = useSelector((state: RootState) => state.products);
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(setConnection(config.wsUrlOrdersAll));
        if (location.pathname.includes('/profile') && !location.state?.modal) {
            const savedUserData = localStorage.getItem('userData');
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                const accessToken = userData.accessToken ?? '';
                const token = accessToken.substring(7) ?? '';
                dispatch(setConnection(`${config.wsUrlOrders}?token=${token}`));
            }
        }
        return () => {
            dispatch(closeConnection);
        }
    }, [dispatch])

    let ordersInfo = orders.allOrders;
    if (location.pathname.includes('/feed')) {
        ordersInfo = orders.allOrders;
    } else if (location.pathname.includes('/profile')) {
        ordersInfo = orders.userOrders;
    }

    useEffect(() => {
        if (ordersInfo) {
            setIsLoading(false);
        }
    }, [ordersInfo]);

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
    if (isLoading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}>
                <Loader/>
            </div>
        );
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
