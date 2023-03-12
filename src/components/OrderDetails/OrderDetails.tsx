import {Modal} from "../Modal/Modal";
import styles from "../OrderDetails/OrderDetails.module.css";
import React from "react";
import {IOrder} from "../../models";


interface OrderDetailsProps {
    data: IOrder;
    onClose: () => void;
    isOpen: boolean;
}

export const OrderDetails = ({data, onClose, isOpen}: OrderDetailsProps) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className={`${styles.OrderDetails} ml-25 mr-25 mt-30 mb-30`}>
                <p className={`${styles.OrderDetailsId} text text_type_digits-large mb-8`}>{data._id}</p>
                <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                <img src={data.image} alt={data.status}/>
                <p className='text text_type_main-default mt-15 mb-2'>{data.status}</p>
                <p className='text text_type_main-default text_color_inactive'>{data.address}</p>
            </div>
        </Modal>
    )
}
