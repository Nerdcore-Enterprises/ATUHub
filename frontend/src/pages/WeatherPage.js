import React from 'react';
import Widget from '../components/homeWidget';
import GenericPage from '../components/genericPage';
import WeatherAPI from '../scripts/weather';
import WeatherListItem from '../components/weatherListItem';
import { useState, useEffect } from 'react';
import '../styles/weather.css'

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
                            <>
                            <h1>This Weeks Forecast</h1>
                            <ul className='inline-flex overflow-hidden w-full overflow-x-auto weather-scroll'>
                                {data.periods.map((period, index) => {
                                    if (index % 2 === 1) return;
                                    return (
                                        <>
                                            {new WeatherListItem(period.name, period.temperature, data.periods[index+1].temperature, period.shortForecast)}
                                        </>
                                        // <li>{period.name} {period.temperature} {period.startTime} {period.endTime} {period.shortForecast}</li>
                                    );
                                })}
                            </ul>
                            </>
                        , "p-4")}
                        {new Widget(
                            <>
                                <img src={data.radar}></img>
                                radar goes here LOL
                            </>
                        )}
                </>
                }
                </>
            )}
        </>
    );
}