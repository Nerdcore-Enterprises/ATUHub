import React, { useEffect, useState } from 'react';
import { fetchMenu } from '../../scripts/DineOnCampus';
import Header from '../../components/header';
import GenericPage from '../../components/genericPage';
import MenuWidget from '../../components/DineOnCampus/MenuWidget';

export default function DineOnCampusMenuPage() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const loadMenu = async () => {
            const chambersMenu = await fetchMenu();
            setMenu(chambersMenu);
        };

        loadMenu();
    }, []);

    return (
        <GenericPage>
            <Header title="What's on the Menu" />
            <div className="space-y-4">
                <MenuWidget
                    menuPeriods={menu || []} // Ensure menu is always an array
                    title="Today's Menu"
                />
            </div>
        </GenericPage>
    );
}
