import React from 'react';
import Widget from '../components/homeWidget';
import GenericPage from '../components/genericPage';
import WeatherAPI from '../scripts/weather';
import WeatherListItem from '../components/weatherListItem';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cloud from '../assets/icons/weather/cloud.svg' 
// import cloudSun from '../assets/icons/weather/cloud-sun.svg' 
import rain from '../assets/icons/weather/rain.svg' 
import sun from '../assets/icons/weather/sun.svg' 
import thunderstorm from '../assets/icons/weather/thunderstorm.svg'  
import '../styles/weather.css'

export default function WeatherPage() {
    const [data, setData] = useState(null);
    const [icon, setIcon] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        WeatherAPI().then(x => {
            setData(x);
            if (x.periods[0].shortForecast.toLowerCase().includes("sun")) setIcon(sun);
            if (x.periods[0].shortForecast.toLowerCase().includes("rain")) setIcon(rain);
            if (x.periods[0].shortForecast.toLowerCase().includes("cloud")) setIcon(cloud);
            if (x.periods[0].shortForecast.toLowerCase().includes("thunder")) setIcon(thunderstorm);
        });
    }, [])

    const handleNav = (path) => {
        navigate(path);
    };

    return (
        <>
            {new GenericPage(
                <>
                {data &&
                <>
                    <div className="flex space-x-4">

                    
                        <div className="flex-fit h-full">
                            <button onClick={() => handleNav('../home')}>
                                {new Widget(<p className="text-xl rounded-full h-full  p-4 font-extrabold pl-8 pr-8">&lt;</p>)}
                            </button>
                        </div>
                        <div className="w-full">
                            {new Widget(
                                <>
                                    <ul className='inline-flex w-full pl-10 pr-10'>
                                        <li className='pt-1 pb-1 w-full min-w-min content-center h-full'><img src={icon} className='min-w-10 align-middle pt-1' alt='weather-icon'></img></li>
                                        <li className='pt-1 pb-1 w-full min-w-min'><h1>{data.periods[0].shortForecast}</h1></li>
                                        <li className='pt-1 pb-1 w-full min-w-min text-right'><h1>{data.periods[0].temperature} F</h1></li>
                                    </ul>
                                </>
                                )}
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
                                <img src={data.radar} alt='weather-radar'></img>
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