import WidgetFixedHeight from "./WidgetFixedHeight";
import AppColors from "../../constants/AppColors";

export default function HomeWidget({ children, className = "", lightModeBg = AppColors.WidgetBgLight, darkModeBg = AppColors.WidgetBgDark }) {
    return (
        <WidgetFixedHeight
            className={className}
            lightModeBg={lightModeBg}
            darkModeBg={darkModeBg}
            height={150}
        >
            {children}
        </WidgetFixedHeight>
    );
}