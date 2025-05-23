import React, { useEffect, useState } from 'react';
import { faCloud, faCloudRain, faSun, faCloudBolt } from '@fortawesome/free-solid-svg-icons';
import WeatherAPI from '../../scripts/weather';
import NavButton from '../Buttons/NavButton';
import HomeWidget from '../BaseWidgets/HomeWidget';
import LoadingIcon from '../GenericErrorPage/LoadingIcon'

export default function CurrentWeatherHomeWidget() {
    const [currentWeather, setCurrentWeather] = useState(null);

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
        <>
            {currentWeather ? (
            <HomeWidget
                title='Weather'
                icon={getWeatherIcon(currentWeather.shortForecast)}
            >
                <br></br>
                <div className="flex flex-row items-center mb-4 mx-6">
                    <div className="flex flex-col text-left">
                        <div className="flex flex-col">
                            <p className="text-xl font-bold">{currentWeather.temperature}°{currentWeather.temperatureUnit}</p>
                            <p className="max-w-48 text-sm">{currentWeather.shortForecast}</p>
                        </div>
                    </div>
                    <NavButton to={'../weather'} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        View More
                    </NavButton>
                </div>
            </HomeWidget>
            ) : (
                <HomeWidget>
                    <div className='pt-4'>
                        <LoadingIcon />
                    </div>
                </HomeWidget>
            )}
        </>
    );
}
