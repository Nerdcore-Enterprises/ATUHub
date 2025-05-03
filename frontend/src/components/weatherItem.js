export default function WeatherListItem(name, high, low, shortForecast){
    let icon = null;

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