import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GenericPage from '../components/genericPage';
import Header from '../components/weatherHeader';
import WeeklyWeatherWidget from '../components/Weather/WeeklyWeather';
import RadarWidget from '../components/Weather/RadarWidget';
import WeatherAPI from '../scripts/weather';

import { faCloud, faCloudRain, faSun, faCloudBolt } from "@fortawesome/free-solid-svg-icons";

export default function WeatherPage() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [weeklyForecast, setWeeklyForecast] = useState([]);

    useEffect(() => {
        async function fetchWeather() {
            const weatherData = await WeatherAPI();
            const currentConditions = weatherData.periods[0];
            setCurrentWeather(currentConditions);
            setWeeklyForecast(weatherData.periods);
        }
        fetchWeather();
    }, []);

    const getWeatherIcon = (shortForecast) => {
        if (shortForecast.includes("Rain")) return faCloudRain;
        if (shortForecast.includes("Sunny")) return faSun;
        if (shortForecast.includes("Thunderstorm")) return faCloudBolt;
        return faCloud;
    };

    const formatForecast = (forecast) => {
        const combinedForecast = {};
        
        forecast.forEach(day => {
            const isNight = day.name.includes('Night');
            const isTonight = day.name.includes('Tonight');

            if (!isTonight) {
                const date = isNight ? day.name.replace(' Night', '') : day.name;
                const temperature = day.temperature;

                if (!combinedForecast[date]) {
                    combinedForecast[date] = { high: isNight ? temperature : temperature, low: isNight ? temperature : temperature, shortForecast: day.shortForecast };
                } else {
                    combinedForecast[date].high = Math.max(combinedForecast[date].high, isNight ? combinedForecast[date].high : temperature);
                    combinedForecast[date].low = Math.min(combinedForecast[date].low, isNight ? temperature : combinedForecast[date].low);
                }
            }
        });

        return Object.entries(combinedForecast).map(([date, values]) => ({
            name: date,
            high: values.high,
            low: values.low,
            shortForecast: values.shortForecast
        }));
    };

    return (
        <GenericPage>
            {currentWeather && (
                <>
                    <Header title={
                        <>
                            <FontAwesomeIcon icon={getWeatherIcon(currentWeather.shortForecast)} className="mr-2" />
                            <p>{currentWeather.shortForecast}</p>
                            <p>{currentWeather.temperature}°{currentWeather.temperatureUnit}</p>
                        </>
                    } />
                    <WeeklyWeatherWidget forecast={formatForecast(weeklyForecast)} />
                    <RadarWidget />
                </>
            )}
        </GenericPage>
    );
}
