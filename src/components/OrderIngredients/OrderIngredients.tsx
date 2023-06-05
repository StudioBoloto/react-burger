import {IOrderProduct} from "../../models";
import {OrderIngredient} from "../OrderIngredient/OrderIngredient";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from '../App/App.module.css'

interface OrderIngredientsProps {
    ingredients: IOrderProduct[];
    number: number;
    name: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    isModal: boolean;
}

export const OrderIngredients = ({
                                     ingredients,
                                     number,
                                     name,
                                     status,
                                     totalAmount,
                                     createdAt,
                                     isModal,
                                 }: OrderIngredientsProps) => {
    const maxHeight = "312px";
    return (
        <div className="ml-8 mr-10 mt-10" style={{
            maxWidth: "720px",
            marginLeft: isModal ? "none" : "auto",
            marginRight: isModal ? "none" : "auto"
        }}>
            <p className={`text text_type_digits-default mb-5`} style={{
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: isModal ? "unset" : "center",
                marginTop: isModal ? "unset" : "120px",
                marginLeft: isModal ? "unset" : "auto",
                marginRight: isModal ? "unset" : "auto"
            }}>#{number}</p>
            <p className="text text text_type_main-medium mb-2">{name}</p>
            <p className={`text text_type_main-small ${status !== "Выполнен" ? "" : "text_color_success"} mb-15`}>
                {status}
            </p>
            <p className="text text_type_main-medium mb-5">Состав:</p>
            <div className={`${commonStyles.scrollContainer} mb-10`} style={{maxHeight}}>
                {ingredients.map((ingredient) => (
                    <span key={ingredient._id}>
                    <OrderIngredient {...ingredient} />
                </span>
                ))}
            </div>
            <div className="mb-10" style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <p className="text text_type_main-default text_color_inactive ml-2">{createdAt}</p>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <p className="text text_type_digits-default mr-2">{totalAmount}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );
};
