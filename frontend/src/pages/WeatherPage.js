import React from 'react';
import Widget from '../components/homeWidget';
import GenericPage from '../components/genericPage';
import WeatherAPI from '../scripts/weather';
import { useState, useEffect } from 'react';

export default function WeatherPage() {
    const [data, setData] = useState(null)

    useEffect(() => {
        WeatherAPI().then(x => {
            setData(x);
        });
    }, [])

    return (
        <>
            {new GenericPage(
                <>
                {data &&
                <>
                    <div className="flex space-x-4">

                    
                        <div className="flex-fit">
                            {new Widget(<p className="text-xl rounded-full h-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] p-4">back</p>)}
                        </div>
                        <div className="w-full">
                            {new Widget(
                                <p className="text-xl rounded-full w-auto h-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] p-4">
                                    {data.periods[0].temperature} F    {data.periods[0].shortForecast}
                                </p>)}
                        </div>
                    </div>
                        {new Widget(
                            <ul>
                                {data.periods.map(period => {
                                    return (
                                        <li>{period.name} {period.temperature} {period.startTime} {period.endTime} {period.shortForecast}</li>
                                    );
                                })}
                            </ul>
                        )}
                        {new Widget(
                            <img src={data.radar}></img>
                        )}
                </>
                }
                </>
            )}
        </>
    );
}