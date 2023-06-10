import {Modal} from "../Modal/Modal";
import styles from "../OrderDetails/OrderDetails.module.css";
import React from "react";
import {IOrder} from "../../models";
import {data} from "../../utils/data";
import Loader from "../Loader/Loader";
import {useSelector} from "../../services/hooks";


interface OrderDetailsProps {
    onClose: () => void;
}

interface OrderState {
    isLoading: boolean;
    hasError: boolean;
    order: {
        number: string;
    };
}

export const OrderDetails = ({onClose}: OrderDetailsProps) => {
    const orderState: OrderState = useSelector((state) => state.order);
    const {isLoading, hasError, order} = orderState;
    const orderDetailsData: IOrder = {
        ...data[0],
        _id: order.number
    };

    return (
        <Modal onClose={onClose}>
            <div className={`${styles.OrderDetails} ml-25 mr-25 mt-30 mb-30`}>
                {isLoading && <>
                    <p className='text text_type_main-medium mb-15'>оформление заказа...</p>
                    <Loader/>
                </>
                }
                {!isLoading && <>
                    <p className={`${styles.OrderDetailsId} text text_type_digits-large mb-8`}>{orderDetailsData._id}</p>
                    <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                    <img src={orderDetailsData.image} alt={orderDetailsData.status}/>
                    <p className='text text_type_main-default mt-15 mb-2'>{orderDetailsData.status}</p>
                    <p className='text text_type_main-default text_color_inactive'>{orderDetailsData.address}</p>
                </>
                }
            </div>
        </Modal>
    )
}
