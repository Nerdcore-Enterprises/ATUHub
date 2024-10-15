import cloud from '../assets/icons/weather/cloud.svg' 
// import cloudSun from '../assets/icons/weather/cloud-sun.svg' 
import rain from '../assets/icons/weather/rain.svg' 
import sun from '../assets/icons/weather/sun.svg' 
import thunderstorm from '../assets/icons/weather/thunderstorm.svg' 

export default function WeatherListItem(name, high, low, shortForecast){
    let icon = null;

    if (shortForecast.toLowerCase().includes("sun")) icon = sun;
    if (shortForecast.toLowerCase().includes("rain")) icon = rain;
    if (shortForecast.toLowerCase().includes("cloud")) icon = cloud;
    if (shortForecast.toLowerCase().includes("thunder")) icon = thunderstorm;

    return(
        <li className="p-2.5 w-full min-w-min">
            <div className="w-full text-center text-nowrap">
                {name}
            </div>
            {icon ?(
                <div className="w-full text-center text-nowrap">
                    <img src={icon} className='m-auto min-w-7' alt='weather-icon'></img>
                </div>
            ) : (
                <div className="w-full text-center text-nowrap">
                    {shortForecast}
                </div>
            )}
            <div className="w-full text-center text-nowrap">
                {high} / {low}
            </div>
        </li>
    );
}