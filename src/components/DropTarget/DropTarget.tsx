import {useDrop} from "react-dnd";
import {IProduct} from "../../models";

type AcceptedItemType = "bun" | "sauce" | "main";


interface ProductProps {
    children: any; // children: React.ReactNode;
    onDropHandler: (item: { id: string; product: IProduct; originalIndex: number; }, itemType: AcceptedItemType) => void;
}

const DropTarget = ({children, onDropHandler}: ProductProps) => {
    const [, dropTarget] = useDrop({
        accept: ["bun", "sauce", "main"],
        drop: (item: { id: string; product: IProduct; originalIndex: number; }, monitor) => {
            const itemType = monitor.getItemType() as AcceptedItemType;
            onDropHandler(item, itemType);
        },
    });

    return (
        <div ref={dropTarget}>
            {children}
        </div>
    );
};

export default DropTarget;
