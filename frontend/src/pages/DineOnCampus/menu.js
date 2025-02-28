import React, {/* useEffect, useState */ } from 'react';
import Header from '../../components/header';
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
            <Header>What's on the Menu</Header>
            <Alert severity={'warning'} text={'Due to connection issues, this page is down until futher notice.'} />
            {/* <div className="space-y-4">
                <DineOnCampusMenuWidget menuPeriods={null} title="Menu" />
            </div> */}
        </GenericPage>
    );
}
