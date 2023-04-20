import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "../BurgerConstructor/BurgerConstructor";
import DropTarget from "../DropTarget/DropTarget";
import {useDispatch} from "react-redux";
import {addIngredient, replaceIngredient} from "../../services/actions/ingredientActions";
import {IProduct} from "../../models";

type AcceptedItemType = "bun" | "sauce" | "main";

const DragAndDropContainer = () => {
    const dispatch = useDispatch();

    const handleDrop = (item: {
        id: string;
        product: IProduct;
        originalIndex: number;
    }, itemType: AcceptedItemType) => {
        const ingredient = item.product;
        if (itemType === "bun") {
            dispatch(replaceIngredient(ingredient));
            dispatch(addIngredient(ingredient));
        } else {
            const updatedIngredient = {...ingredient, id: item.id};
            dispatch(addIngredient(updatedIngredient));
        }
    }
    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <DropTarget onDropHandler={handleDrop}>
                <BurgerConstructor/>
            </DropTarget>
        </DndProvider>
    )
}

export default DragAndDropContainer
