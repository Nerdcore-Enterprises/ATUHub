export default function WeatherListItem(name, high, low, shortForecast){
    return(
        <li className="p-2.5 w-full min-w-min">
            <div className="w-full text-center text-nowrap">
                {name}
            </div>
            <div className="w-full text-center text-nowrap">
                {shortForecast}
            </div>
            <div className="w-full text-center text-nowrap">
                {high} / {low}
            </div>
        </li>
    );
}