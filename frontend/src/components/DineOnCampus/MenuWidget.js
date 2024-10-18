import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function DineOnCampusMenuWidget({ menuPeriods = [], title }) {
    const validMenuPeriods = Array.isArray(menuPeriods) ? menuPeriods : [];
    const [openPeriods, setOpenPeriods] = useState({});

    const handlePeriodToggle = (periodIndex) => {
        setOpenPeriods(prevState => ({
            ...prevState,
            [periodIndex]: !prevState[periodIndex],
        }));
    };

    return (
        <div className="flex flex-col items-center space-y-4 bg-white rounded-[2rem] p-4 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
            <h2 className="font-bold text-2xl">{title}</h2>

            {validMenuPeriods.length === 0 ? (
                    <span className="text-lg text-zinc-500 font-bold">Loading...</span>
            ) : (
                validMenuPeriods.map((period, periodIndex) => {
                    const isOpen = openPeriods[periodIndex];

                    return (
                        <div key={periodIndex} className={`bg-zinc-800 flex flex-col w-full rounded-[2rem] ${isOpen ? 'rounded-b-[1rem]' : 'rounded-b-[2rem]'}`}>
                            <div 
                                className="flex items-center justify-between bg-zinc-800 text-white rounded-full py-2 px-4 cursor-pointer" 
                                onClick={() => handlePeriodToggle(periodIndex)}
                            >
                                <h3 className="font-bold text-lg">{period.period}</h3>
                                <FontAwesomeIcon 
                                    icon={faChevronRight} 
                                    className={`transition-transform duration-300 p-1 ${isOpen ? 'rotate-90' : 'rotate-0'}`} 
                                />
                            </div>

                            <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-fit' : 'max-h-0'}`}>
                                <div className="flex flex-col space-y-2 px-2 pb-2">
                                    {period.categories.map((category, categoryIndex) => (
                                        <div key={categoryIndex} className="bg-zinc-200 rounded-lg">
                                            <div className="p-3">
                                                <h4 className="font-semibold text-lg text-zinc-700">{category.category}</h4>
                                            </div>
                                            {category.items.length === 0 ? (
                                                <p className="text-zinc-500 font-bold p-3">No items found</p>
                                            ) : (
                                                <ul className="list-disc list-inside p-3">
                                                    {category.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="text-zinc-700">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}