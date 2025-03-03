import Widget from "./Widget";
import AppColors from "../../constants/AppColors";

export default function WidgetFullHeight({ children, className = "", lightModeBg = AppColors.WidgetBgLight, darkModeBg = AppColors.WidgetBgDark }) {
    return (
        <Widget
            className={className + " h-full"}
            lightModeBg={lightModeBg}
            darkModeBg={darkModeBg}
        >
            {children}
        </Widget>
    );
}