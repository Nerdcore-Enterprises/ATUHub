import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudRain, faSun, faCloudBolt } from "@fortawesome/free-solid-svg-icons";
import '../../styles/weather.css';
import Widget from '../BaseWidgets/Widget';
import FadedText from '../FadedText';
import WidgetDark from '../BaseWidgets/WidgetDark';

export default function WeeklyWeatherWidget({ forecast }) {
    const getWeatherIcon = (shortForecast) => {
        if (shortForecast.includes("Rain")) return faCloudRain;
        if (shortForecast.includes("Sunny")) return faSun;
        if (shortForecast.includes("Thunderstorm")) return faCloudBolt;
        return faCloud;
    };

    return (
        <Widget className='px-5 py-4'>
            <h2 className="font-bold text-2xl mb-4">This Week's Forecast</h2>
            <div className="flex space-x-4 rounded-b-[1rem] overflow-x-auto weather-scroll">
                {forecast.map((day, index) => (
                    <WidgetDark key={index} className='flex flex-col items-center min-w-32 px-4 shadow-none'>
                        <p className="font-bold whitespace-nowrap">{day.name}</p>
                        <FontAwesomeIcon icon={getWeatherIcon(day.shortForecast)} className="mb-2" />
                        <p className="text-lg whitespace-nowrap">
                            {day.high}° / <FadedText>{day.low}°</FadedText>
                        </p>
                    </WidgetDark>
                ))}
            </div>
        </Widget>
    );
}
