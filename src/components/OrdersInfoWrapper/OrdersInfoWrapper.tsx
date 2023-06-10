import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Modal} from "../Modal/Modal";
import {NotFound404} from "../../pages/NotFound404/NotFound404";
import {OrderInfo} from "../OrderInfo/OrderInfo";
import {closeConnection, setConnection} from "../../services/reducers/orderSlice";
import {config} from "../../services/Api";
import Loader from "../Loader/Loader";
import {useDispatch, useSelector} from "../../services/hooks";


export const OrdersInfoWrapper = () => {
    const {id} = useParams<{ id: string }>();
    const orders = useSelector((state) => state.orders);
    const dispatch = useDispatch();
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
