import {IOrderProduct} from "../../models";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from '../App/App.module.css'
import {ImageCircle} from "../ImageCircle/ImageCircle";

export const OrderIngredient = (ingredient: IOrderProduct) => {

    return (
        <div className={`${commonStyles.ingredientListItem} mb-4`}>
            <ImageCircle src={ingredient.image_mobile} alt={ingredient.name}/>
            <p className="text text_type_main-default">{ingredient.name}</p>
            <div className={`${commonStyles.ingredientListItem} mr-6`}>
                <p className="text text_type_digits-default mr-2">{ingredient.count} x {ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
        </div>
    )
}
