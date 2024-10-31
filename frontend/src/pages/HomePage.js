import React, { useEffect, useState } from 'react';
import { fetchHours } from '../scripts/DineOnCampus';

import Widget from '../components/homeWidget';
import GenericPage from '../components/genericPage';
import DineOnCampusWidget from '../components/DineOnCampus/DineOnCampusWidget';
import WeatherWidget from '../components/Weather/WeatherWidget';

export default function HomePage() {
    const [earliestStart, setEarliestStart] = useState(null);
    const [latestEnd, setLatestEnd] = useState(null);

    useEffect(() => {
        const loadHours = async () => {
            const { earliestStart, latestEnd } = await fetchHours();
            setEarliestStart(earliestStart);
            setLatestEnd(latestEnd);
        };

        loadHours();
    }, []);

    return (
        <GenericPage>
            <Widget title="🎉 Welcome to ATUHub 🎉" />
            <DineOnCampusWidget earliestStart={earliestStart} latestEnd={latestEnd} />
            <WeatherWidget />
        </GenericPage>
    );
}
