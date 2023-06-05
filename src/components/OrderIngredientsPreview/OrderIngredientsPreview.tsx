import {IOrderProduct} from "../../models";
import {ImageCircles} from "../ImageCircles/ImageCircles";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


interface OrderIngredientsPreviewProps {
    ingredients: IOrderProduct[];
    number: number;
    name: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    isFeed: boolean;
}

export const OrderIngredientsPreview = ({
                                            ingredients,
                                            number,
                                            name,
                                            status,
                                            totalAmount,
                                            createdAt,
                                            isFeed,
                                        }: OrderIngredientsPreviewProps) => {
    const maxWidth = isFeed ? "582px" : "842px";
    const width = isFeed ? "536px" : "796px";
    return (
        <div className="mr-2" style={{
            maxWidth,
            background: "#1C1C21",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.04)",
            borderRadius: "40px",
            border: "1px solid #1C1C21"
        }}>
            <div className="m-6" style={{width}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p className={`text text_type_digits-default mb-6`}>#{number}</p>
                    <p className="text text_type_main-default text_color_inactive">{createdAt}</p>
                </div>
                <p className="text text text_type_main-medium mb-2">{name}</p>
                <p className={`text text_type_main-small ${status !== "Выполнен" ? "" : "text_color_success"} mb-6`}>
                    {status}
                </p>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <ImageCircles ingredients={ingredients}/>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <p className="text text_type_digits-default mr-2">{totalAmount}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </div>
    );
};
