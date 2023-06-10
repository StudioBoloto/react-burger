import type {FC} from 'react'
import {memo, useCallback} from 'react'
import {useDrop} from 'react-dnd'
import {DraggableItem} from "../DraggableItem/DraggableItem";
import {IProduct} from "../../models";
import {removeIngredient, sortIngredient} from "../../services/actions/ingredientActions";
import {useDispatch} from "react-redux";
import commonStyles from '../App/App.module.css'
import {useSelector} from "../../services/hooks";

export const ItemTypes = {
    ITEM: 'item',
}

export const DraggableContainer: FC = memo(function DraggableContainer() {
    const dispatch = useDispatch();
    const {basket} = useSelector((state) => state.ingredients);
    const handleDeleteButtonClick = (ingredient: IProduct) => {
        dispatch(removeIngredient(ingredient));
    };

    const findItem = useCallback(
        (id: string) => {
            const item = basket.filter(it => it.id === id)[0]
            return {
                item,
                index: basket.indexOf(item),
            }
        },
        [basket],
    )

    const moveItem = useCallback(
        (id: string, atIndex: number) => {
            const {item, index} = findItem(id);
            dispatch(sortIngredient({
                oldIndex: index,
                newIndex: atIndex
            }));
        },
        [findItem, dispatch]
    );

    const [, dropRef] = useDrop(() => ({accept: ItemTypes.ITEM}))
    return (
        <div ref={dropRef} className={`${commonStyles.scrollContainer} ${commonStyles.scrollContainerSmall}`}>
            {basket.length > 0 && basket.map((item) => (
                <DraggableItem
                    item={item}
                    key={item.id}
                    id={item.id}
                    moveItem={moveItem}
                    findItem={findItem}
                    onClick={handleDeleteButtonClick}
                />
            ))}
        </div>
    )
})
