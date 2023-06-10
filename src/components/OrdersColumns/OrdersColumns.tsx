import React from "react";
import styles from "./OrdersColumns.module.css";

interface OrdersColumnsProps {
    columns: number[][];
    status: string;
}

export const OrdersColumns = ({columns, status}: OrdersColumnsProps) => {
    const columnsName = status === "Выполнен" ? "Готовы: " : "В работе: ";

    return (
        <div className={`${status === "Выполнен" ? "" : "ml-9 mb 10"} ${styles.columnsWrapper}`}>
            <p className={"text text_type_main-medium mb-6"}>{columnsName}</p>
            <div className={styles.columnsContainer}>
                {columns && columns.map((column, columnIndex) => (
                    <div className={styles.columnContainer} key={columnIndex}>
                        {column && column.map((orderNumber, orderIndex) => (
                            <div className="order" key={orderIndex}>
                                <p className={`text text_type_digits-default 
                        ${status !== "Выполнен" ? "" : "text_color_success"} `}>{orderNumber}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
