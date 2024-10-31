import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudRain, faSun, faCloudBolt } from "@fortawesome/free-solid-svg-icons";

import '../../styles/weather.css';

export default function WeeklyWeatherWidget({ forecast }) {
    const getWeatherIcon = (shortForecast) => {
        if (shortForecast.includes("Rain")) return faCloudRain;
        if (shortForecast.includes("Sunny")) return faSun;
        if (shortForecast.includes("Thunderstorm")) return faCloudBolt;
        return faCloud;
    };

    return (
        <div className="bg-white rounded-[2rem] px-5 py-4 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
            <h2 className="font-bold text-2xl mb-4">This Week's Forecast</h2>
            <div className="flex space-x-4 rounded-b-[1rem] overflow-x-auto weather-scroll">
                {forecast.map((day, index) => (
                    <div key={index} className="bg-zinc-300 rounded-[2rem] flex flex-col items-center min-w-32">
                        <p className="font-bold">{day.name}</p>
                        <FontAwesomeIcon icon={getWeatherIcon(day.shortForecast)} className="mb-2" />
                        <p className="text-lg">
                            {day.high}° / <span className="text-gray-500">{day.low}°</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
