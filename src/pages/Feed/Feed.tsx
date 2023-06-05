import {OrderInfo} from "../../components/OrderInfo/OrderInfo";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getProducts} from "../../services/actions/productActions";
import commonStyles from "../../components/App/App.module.css";
import {OrdersColumns} from "../../components/OrdersColumns/OrdersColumns";
import {useLocation, useNavigate} from "react-router-dom";
import {closeConnection, setConnection} from "../../services/reducers/orderSlice";
import {config} from "../../services/Api";
import Loader from "../../components/Loader/Loader";

export const Feed = () => {
    const isFeed = true
    const maxHeight = isFeed ? "812px" : "868px";
    const width = isFeed ? "596px" : "844px";
    const maxWidth = isFeed ? "604px" : "844px";
    const maxItemsPerColumn = 10;
    const location = useLocation();
    const navigate = useNavigate();
    const {products} = useSelector((state: RootState) => state.products);
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const orders = useSelector((state: RootState) => state.orders);
    const ordersInfo = orders.allOrders;

    useEffect(() => {
        dispatch(setConnection(config.wsUrlOrdersAll));
        return () => {
            dispatch(closeConnection);
        }
    }, [dispatch])

    useEffect(() => {
        if (!products.length) {
            dispatch(getProducts());
        }
    }, [dispatch, products.length]);


    const handleOpenModal = (_id: string) => {
        navigate(`/feed/${_id}`, {state: {modal: true, from: '/feed', background: location}});
    }

    const doneOrders = ordersInfo?.orders
        .filter((order) => order.status === "done")
        .map((order) => order.number);

    const inProgressOrders = ordersInfo?.orders
        .filter((order) => order.status !== "done")
        .map((order) => order.number);

    const doneColumnsCount = Math.ceil((doneOrders?.length || 0) / maxItemsPerColumn);
    const inProgressColumnsCount = Math.ceil((inProgressOrders?.length || 0) / maxItemsPerColumn);

    const groupOrdersByColumns = (orders: number[], columnsCount: number) => {
        const columns = [];

        for (let i = 0; i < columnsCount; i++) {
            const startIndex = i * maxItemsPerColumn;
            const endIndex = startIndex + maxItemsPerColumn;
            const columnOrders = orders?.slice(startIndex, endIndex);
            columns.push(columnOrders);
        }
        return columns;
    };

    const doneColumns = groupOrdersByColumns(doneOrders || [], doneColumnsCount);
    const inProgressColumns = groupOrdersByColumns(inProgressOrders || [], inProgressColumnsCount);

    return (
        <>
            {!ordersInfo &&
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}>
                    <Loader/>
                </div>
            }
            <div className="text text_type_main-large mt-10 mb-5" style={{
                maxWidth: "1240px",
                marginRight: "auto",
                marginLeft: "auto",
            }}>
                Лента заказов
            </div>
            <div style={{
                display: "flex",
                marginRight: "auto",
                marginLeft: "auto",
            }}>
                <div className={`${commonStyles.scrollContainer} mb-10 mr-15`} style={{
                    maxHeight, maxWidth,
                    marginLeft: "auto",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "24px",
                        width,
                    }}>
                        {ordersInfo && ordersInfo.orders.map((order) => (
                            <span key={order._id} onClick={() => {
                                handleOpenModal(order._id);
                            }}>
                    <OrderInfo order={order} isPreview={true} isFeed={isFeed}/>
                </span>
                        ))}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    marginRight: "auto",
                    flexDirection: "column",
                }}>
                    <div className={"mb-10"} style={{display: "flex", flexDirection: "row", width: "580px"}}>
                        <OrdersColumns columns={doneColumns} status={"Выполнен"}/>
                        <OrdersColumns columns={inProgressColumns} status={"Готовится"}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        {ordersInfo && (
                            <p className="text text_type_digits-large mb-10">{ordersInfo.total}</p>
                        )}
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        {ordersInfo && (
                            <p className="text text_type_digits-large">{ordersInfo.totalToday}</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
