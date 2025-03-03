import React, {/* useEffect, useState */ } from 'react';
import HeaderWithBack from '../../components/HeaderWithBack';
import GenericPage from '../../components/genericPage';
import Alert from '../../components/Alert';
// import DineOnCampusMenuWidget from '../../components/DineOnCampus/MenuWidget';
// import { fetchMenu } from '../../scripts/DineOnCampus';

export default function DineOnCampusMenuPage() {
    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     const loadMenu = async () => {
    //         const chambersMenu = await fetchMenu();
    //         setMenu(chambersMenu);
    //     };

    //     loadMenu();
    // }, []);

    return (
        <GenericPage>
            <HeaderWithBack>What's on the Menu</HeaderWithBack>
            <Alert severity={'warning'} text={'Due to connection issues, this page is down until futher notice.'} />
            {/* <div className="space-y-4">
                <DineOnCampusMenuWidget menuPeriods={null} title="Menu" />
            </div> */}
        </GenericPage>
    );
}
