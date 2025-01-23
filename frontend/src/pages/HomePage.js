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
            <Widget>
                <h1 className='font-normal text-lg px-6 py-4 w-full text-center'>🎉 Welcome to ATUHub 🎉</h1>
            </Widget>
            <div className='w-full lg:flex gap-6'>
                <DineOnCampusWidget earliestStart={earliestStart} latestEnd={latestEnd} />
                <WeatherWidget />
            </div>
        </GenericPage>
    );
}
