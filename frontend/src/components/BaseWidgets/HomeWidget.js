import WidgetFixedHeight from "./WidgetFixedHeight";
import AppColors from "../../constants/AppColors";
import InvertableImage from "../InvertableImage";
import Widget from "./Widget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeWidget({ children, className = "", lightModeBg = AppColors.WidgetBgLight, darkModeBg = AppColors.WidgetBgDark, title = "", icon, image }) {
    return (
        <Widget
            className={className + " min-h-[150px]"}
            lightModeBg={lightModeBg}
            darkModeBg={darkModeBg}
        >
            <div className="flex flex-row items-center my-4 mx-6 mb-0">
                {icon &&
                    <FontAwesomeIcon icon={icon} className="mr-4 text-4xl" />
                }
                {image &&
                    <InvertableImage src={image} alt="DineOnCampus" className="w-8 h-auto" />
                }
                <p className="text-3xl font-semibold ml-auto text-right ">{title}</p>
            </div>
            {children}
        </Widget>
    );
}