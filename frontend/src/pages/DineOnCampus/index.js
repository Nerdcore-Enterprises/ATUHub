import React, { useEffect, useState } from 'react';
import { fetchHours } from '../../scripts/DineOnCampus';

import Header from '../../components/header';
import Widget from '../../components/DineOnCampus/PageWidget';
import GenericPage from '../../components/genericPage';

export default function DineOnCampusPage() {
    const [chambersHours, setChambersHours] = useState([]);
    const [bazTechHours, setBazTechHours] = useState([]);
    const [hullHours, setHullHours] = useState([]);
    const [chambersTimes, setChambersTimes] = useState({ earliestStart: null, latestEnd: null });
    const [bazTechTimes, setBazTechTimes] = useState({ earliestStart: null, latestEnd: null });
    const [hullTimes, setHullTimes] = useState({ earliestStart: null, latestEnd: null });

    const calculateEarliestAndLatest = (locations) => {
        let earliestStartHour = null;
        let latestEndHour = null;

        locations.forEach(location => {
            location.todayHours.forEach(hour => {
                const startHourInMinutes = hour.start_hour * 60 + hour.start_minutes;
                const endHourInMinutes = hour.end_hour * 60 + hour.end_minutes;

                if (earliestStartHour === null || startHourInMinutes < earliestStartHour) {
                    earliestStartHour = startHourInMinutes;
                }

                if (latestEndHour === null || endHourInMinutes > latestEndHour) {
                    latestEndHour = endHourInMinutes;
                }
            });
        });

        const formatTime = (timeInMinutes) => {
            const hours = Math.floor(timeInMinutes / 60);
            const minutes = timeInMinutes % 60;
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            return `${formattedHour}:${formattedMinutes} ${period}`;
        };

        const earliestStart = earliestStartHour !== null ? formatTime(earliestStartHour) : 'N/A';
        const latestEnd = latestEndHour !== null ? formatTime(latestEndHour) : 'N/A';

        return { earliestStart, latestEnd };
    };

    useEffect(() => {
        const loadHours = async () => {
            const { locationsHours } = await fetchHours();

            const chambers = locationsHours.filter(location => location.name.includes("Chamber's"));
            const bazTech = locationsHours.filter(location => ["Tacos 4 Life"].includes(location.name) || location.name.includes("- Baz Tech"));
            const hull = locationsHours.filter(location => location.name.includes("- Hull") || location.name === "Smoothie Bar");

            const cleanedBazTech = bazTech.map(location => ({ ...location, name: location.name.replace("- Baz Tech", '').trim() }));
            const cleanedHull = hull.map(location => ({ ...location, name: location.name.replace("- Hull", '').trim() }));

            setChambersHours(chambers);
            setBazTechHours(cleanedBazTech);
            setHullHours(cleanedHull);

            setChambersTimes(calculateEarliestAndLatest(chambers));
            setBazTechTimes(calculateEarliestAndLatest(cleanedBazTech));
            setHullTimes(calculateEarliestAndLatest(cleanedHull));
        };

        loadHours();
    }, []);

    return (
        <GenericPage>
            <Header title="DineOnCampus" />
            <div className="space-y-4">
                <Widget locations={chambersHours} earliestStart={chambersTimes.earliestStart} latestEnd={chambersTimes.latestEnd} title="Chamber's" />
                <Widget locations={bazTechHours} earliestStart={bazTechTimes.earliestStart} latestEnd={bazTechTimes.latestEnd} title="BazTech" />
                <Widget locations={hullHours} earliestStart={hullTimes.earliestStart} latestEnd={hullTimes.latestEnd} title="Hull" />
            </div>
        </GenericPage>
    );
}