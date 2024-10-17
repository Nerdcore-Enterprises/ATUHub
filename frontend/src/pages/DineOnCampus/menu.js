import React, { useEffect, useState } from 'react';
import { fetchChambersMenu } from '../../scripts/DineOnCampus';

import Header from '../../components/header';
import GenericPage from '../../components/genericPage';

export default function ChambersMenuPage() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const loadMenu = async () => {
            const chambersMenu = await fetchChambersMenu();
            setMenu(chambersMenu);
        };

        loadMenu();
    }, []);

    return (
        <GenericPage>
            <Header title="Chamber's Menu" />
            <div className="space-y-4">
                {menu.length === 0 ? (
                    <p>No menu available at this time.</p>
                ) : (
                    <div className="menu-list">
                        {menu.map((category, index) => (
                            <div key={index} className="menu-category">
                                <h3 className="text-lg font-bold">{category.category}</h3>
                                {category.items.length === 0 ? (
                                    <p>No items available.</p>
                                ) : (
                                    <ul className="list-disc pl-5">
                                        {category.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="menu-item">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </GenericPage>
    );
}