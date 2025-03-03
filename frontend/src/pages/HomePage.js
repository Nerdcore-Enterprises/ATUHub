import React, { useEffect, useState } from 'react';
import { fetchHours } from '../scripts/DineOnCampus';

import Widget from '../components/BaseWidgets/Widget';
import GenericPage from '../components/genericPage';
import DineOnCampusHomeWidget from '../components/HomeWidgets/DineOnCampusHomeWidget';
import WeatherHomeWidget from '../components/HomeWidgets/WeatherHomeWidget';
import JobHomeWidget from '../components/HomeWidgets/JobHomeWidget';
import TransportationHomeWidget from '../components/HomeWidgets/TransportationHomeWidget';
import Header from '../components/Header';

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
            <Header className="text-center">🎉 Welcome to ATUHub 🎉</Header>
            {/* If we decide we want more widgets. Switch lg:grid-cols-2 to lg:grid-cols-3 */}
            <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2'>
                <DineOnCampusHomeWidget earliestStart={earliestStart} latestEnd={latestEnd} />
                <WeatherHomeWidget />
                <JobHomeWidget/>
                <TransportationHomeWidget />
            </div>
        </GenericPage>
    );
}
