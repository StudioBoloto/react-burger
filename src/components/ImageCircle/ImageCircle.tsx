import commonStyles from "../App/App.module.css";

type ImageCircleProps = {
    src: string;
    alt: string;
};

export const ImageCircle = ({src, alt}: ImageCircleProps) => {
    return (
        <div className={`${commonStyles.imageCircle} ml-2 mt-1`}>
            <img src={src} alt={alt}/>
        </div>
    );
};

