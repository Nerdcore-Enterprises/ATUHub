import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudRain, faSun, faCloudBolt } from '@fortawesome/free-solid-svg-icons';
import WeatherAPI from '../../scripts/weather';

export default function CurrentWeatherWidget() {
    const [currentWeather, setCurrentWeather] = useState(null);
    
    const navigate = useNavigate();

    const handleNav = (path) => {
        navigate(path);
    };

    useEffect(() => {
        const fetchCurrentWeather = async () => {
            const weatherData = await WeatherAPI();
            const currentConditions = weatherData.periods[0];
            setCurrentWeather(currentConditions);
        };

        fetchCurrentWeather();
    }, []);
    
    const getWeatherIcon = (shortForecast) => {
        if (shortForecast.includes("Rain")) return faCloudRain;
        if (shortForecast.includes("Sunny")) return faSun;
        if (shortForecast.includes("Thunderstorm")) return faCloudBolt;
        return faCloud;
    };

    return (
        <div className="flex flex-col bg-white rounded-[2rem] pt-6 px-2 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
            {currentWeather ? (
                <>
                    <div className="flex flex-row items-center mb-4 mx-6">
                        <FontAwesomeIcon icon={getWeatherIcon(currentWeather.shortForecast)} className="mr-4 text-4xl" />
                        <p className="text-3xl font-semibold ml-auto text-center">
                            Weather
                        </p>
                    </div>
                    <div className="flex flex-row items-center mb-4 mx-6">
                    <div className="flex flex-col text-left">
                        <div className="flex flex-col">
                            <p className="text-2xl font-bold">{currentWeather.temperature}°{currentWeather.temperatureUnit}</p>
                            <p className="max-w-48 text-base">{currentWeather.shortForecast}</p>
                        </div>
                    </div>
                    <button onClick={() => handleNav('../weather')} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        View More
                    </button>
                </div>
                </>
            ) : (
                <p className="text-zinc-500 font-bold">Loading...</p>
            )}
        </div>
    );
}
