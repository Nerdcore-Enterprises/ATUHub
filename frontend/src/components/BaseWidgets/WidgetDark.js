import AppColors from "../../constants/AppColors";
import Widget from "./Widget";

export default function WidgetDark({ children, className = "", lightModeBg = AppColors.PageBgLight, darkModeBg = AppColors.PageBgDark }) {
    return (
        <>
            <Widget
                className={className}
                lightModeBg={lightModeBg}
                darkModeBg={darkModeBg}
            >
                {children}
            </Widget>
        </>
    );
}
