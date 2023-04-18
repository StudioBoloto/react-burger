import {useDrag} from "react-dnd";
import {Product} from "../Product/Product";
import {IProduct} from "../../models";
//@ts-ignore
import {v4 as uuid} from 'uuid';

interface DraggableIngredientProps {
    product: IProduct;
    onClick: () => void;
}

export function DraggableIngredient(data: DraggableIngredientProps) {
    const {product, onClick} = data;
    const [{isDragging}, dragRef] = useDrag({
        type: product.type,
        item: {id: uuid(), product},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={dragRef}>
            <Product product={product} onClick={onClick}/>
        </div>
    );
}
