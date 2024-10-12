import React, { useEffect, useState } from 'react';
import { fetchHours } from '../scripts/dineoncampus';

import Header from '../components/header';
import Widget from '../components/DineOnCampus/PageWidget';
import GenericPage from '../components/genericPage';

export default function DineOnCampusPage() {
    const [locationsHours, setLocationsHours] = useState([]);
    const [earliestStart, setEarliestStart] = useState(null);
    const [latestEnd, setLatestEnd] = useState(null);

    useEffect(() => {
        const loadHours = async () => {
            const { earliestStart, latestEnd, locationsHours } = await fetchHours();
            setEarliestStart(earliestStart);
            setLatestEnd(latestEnd);
            setLocationsHours(locationsHours);
        };

        loadHours();
    }, []);

    return (
        <GenericPage>
            <Header title="DineOnCampus" />
            <Widget locations={locationsHours} earliestStart={earliestStart} latestEnd={latestEnd} />
        </GenericPage>
    );
}