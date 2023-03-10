import React from "react";

interface IngredientsTitleProps {
    children: React.ReactNode;
    className?: string | undefined;
}

export const IngredientsTitle = (props: IngredientsTitleProps) => {
    return (
        <section>
            <p className={`text ${props.className}`}>
                {props.children}
            </p>
        </section>
    )
}