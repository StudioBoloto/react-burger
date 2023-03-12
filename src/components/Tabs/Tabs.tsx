import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

export const Tabs = () => {
    const [current, setCurrent] = React.useState('bun');
    return (
        <nav className='mt-5' style={{display: 'flex'}}>
            <Tab value='bun' active={current === 'bun'} onClick={() => setCurrent('bun')} children='Булки'/>
            <Tab value='sauce' active={current === 'sauce'} onClick={() => setCurrent('sauce')} children='Соусы'/>
            <Tab value='main' active={current === 'main'} onClick={() => setCurrent('main')} children='Начинки'/>
        </nav>
    );
};