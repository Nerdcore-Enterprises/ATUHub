import React, { useEffect, useState } from 'react';
import { fetchHours } from '../scripts/DineOnCampus';

import Widget from '../components/homeWidget';
import GenericPage from '../components/genericPage';
import DineOnCampusWidget from '../components/DineOnCampus/DineOnCampusWidget';
import WeatherWidget from '../components/Weather/WeatherWidget';
import JobHomeWidget from '../components/JobSearch/JobHomeWidget';
import TransportationHomeWidget from '../components/Transportation/TransportationHomeWidget';

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
            {/* If we decide we want more widgets. Switch lg:grid-cols-2 to lg:grid-cols-3 */}
            <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2'>
                <DineOnCampusWidget earliestStart={earliestStart} latestEnd={latestEnd} />
                <WeatherWidget />
                <JobHomeWidget/>
                <TransportationHomeWidget />
            </div>
        </GenericPage>
    );
}
