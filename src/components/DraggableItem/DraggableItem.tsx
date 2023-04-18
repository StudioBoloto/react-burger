import type {FC} from 'react'
import React, {memo} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {IProduct} from "../../models";
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProductItem} from "../ProductItem/ProductItem";
import {ItemTypes} from "../DraggableContainer/DraggableContainer";

interface DraggableItemProps {
    item: IProduct;
    id: string
    moveItem: (id: string, to: number) => void
    findItem: (id: string) => { index: number }
    onClick: (ingredient: IProduct) => void;
}

interface Item {
    id: string
    originalIndex: number
}

export const DraggableItem: FC<DraggableItemProps> = memo(function Card(data) {
    const {
        item,
        id,
        moveItem,
        findItem,
        onClick,
    } = data
    const originalIndex = findItem(id).index
    const [{isDragging}, dragRef] = useDrag(
        () => ({
            type: ItemTypes.ITEM,
            item: {id, originalIndex},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const {id: droppedId, originalIndex} = item
                const didDrop = monitor.didDrop()
                if (!didDrop) {
                    moveItem(droppedId, originalIndex)
                }
            },
        }),
        [id, originalIndex, moveItem],
    )

    const [, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.ITEM,
            hover({id: draggedId}: Item) {
                if (draggedId !== id) {
                    const {index: overIndex} = findItem(id)
                    moveItem(draggedId, overIndex)
                }
            },
        }),
        [findItem, moveItem],
    )

    return (
        <div ref={(node) => dragRef(dropRef(node))} style={{opacity: isDragging ? 0.5 : 1}}>
            <div className={`${styles.productElement} ${styles.productElementWide}`} key={id}>
                <DragIcon type="secondary"/>
                <ProductItem product={item} onClick={onClick}/>
            </div>
        </div>
    )
})
