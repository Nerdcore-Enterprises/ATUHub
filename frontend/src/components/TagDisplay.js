import WidgetDark from "./BaseWidgets/WidgetDark";
import HorizontalWidgetList from "./WidgetContainers/HorizontalWidgetList";
import '../styles/weather.css'

export default function TagDisplay({tags}){
    return (
        <HorizontalWidgetList className="initial flex overflow-x-auto weather-scroll">
            {tags.map((tag, index) => (
                <div>
                    <WidgetDark key={index} className='items-center whitespace-nowrap px-4 shadow-none'>
                        <p>{tag}</p>
                    </WidgetDark>
                </div>
            ))}
        </HorizontalWidgetList>
    );
}