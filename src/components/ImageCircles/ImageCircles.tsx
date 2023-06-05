import {IOrderProduct} from "../../models";
import {ImageCircle} from "../ImageCircle/ImageCircle";
import styles from './ImageCircles.module.css'

export const ImageCircles = ({ingredients}: { ingredients: IOrderProduct[] }) => {
    const maxVisibleImages = 6;
    const extraCount = Math.max(0, ingredients.length - maxVisibleImages);

    return (
        <div className={styles.imageCirclesContainer}>
            {ingredients.slice(0, maxVisibleImages).map((ingredient, index) => (
                <div
                    key={ingredient._id}
                    className={`${styles.imageCircleWrapper}
                    ${index === maxVisibleImages - 1 && extraCount > 0 ? styles.overlay : ""}`}
                >
                    <ImageCircle src={ingredient.image_mobile} alt={ingredient.name}/>
                    {index === maxVisibleImages - 1 && extraCount > 0 && (
                        <div className={styles.overlayContent}>+{extraCount}</div>
                    )}
                </div>
            ))}
        </div>
    );
};
