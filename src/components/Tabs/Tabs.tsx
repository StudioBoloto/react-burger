import React, {useEffect, useRef} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

interface ITabsProps {
    bunsRef: React.RefObject<HTMLDivElement>;
    saucesRef: React.RefObject<HTMLDivElement>;
    mainsRef: React.RefObject<HTMLDivElement>;
}

export const Tabs = ({bunsRef, saucesRef, mainsRef}: ITabsProps) => {
    const [current, setCurrent] = React.useState('bun');
    useEffect(() => {
        const scrollContainer = document.querySelector('#scrollContainer');
        function handleScroll() {
            const bunsRefCurrent = bunsRef.current;
            const saucesRefCurrent = saucesRef.current;
            const mainsRefCurrent = mainsRef.current;

            if (bunsRefCurrent && saucesRefCurrent && mainsRefCurrent) {
                const bunsRect = bunsRefCurrent.getBoundingClientRect();
                const saucesRect = saucesRefCurrent.getBoundingClientRect();
                const mainsRect = mainsRefCurrent.getBoundingClientRect();

                const bunsDistance = Math.abs(bunsRect.y);
                const saucesDistance = Math.abs(saucesRect.y);
                const mainsDistance = Math.abs(mainsRect.y);

                if (bunsDistance <= saucesDistance && bunsDistance <= mainsDistance) {
                    setCurrent('bun');
                } else if (saucesDistance <= bunsDistance && saucesDistance <= mainsDistance) {
                    setCurrent('sauce');
                } else if (mainsDistance <= bunsDistance && mainsDistance <= saucesDistance) {
                    setCurrent('main');
                }
            }
        }
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            return () => scrollContainer.removeEventListener('scroll', handleScroll);
        }
    }, [bunsRef, saucesRef, mainsRef]);

    function handleTabClick(tab: string) {
        setCurrent(tab);
        if (tab === 'bun' && bunsRef.current) {
            bunsRef.current.scrollIntoView({behavior: "smooth"});
        } else if (tab === 'sauce' && saucesRef.current) {
            saucesRef.current.scrollIntoView({behavior: "smooth"});
        } else if (tab === 'main' && mainsRef.current) {
            mainsRef.current.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <nav className='mt-5' style={{display: 'flex'}}>
            <Tab value='bun' active={current === 'bun'} onClick={() => handleTabClick('bun')} children='Булки'/>
            <Tab value='sauce' active={current === 'sauce'} onClick={() => handleTabClick('sauce')} children='Соусы'/>
            <Tab value='main' active={current === 'main'} onClick={() => handleTabClick('main')} children='Начинки'/>
        </nav>
    );
};
