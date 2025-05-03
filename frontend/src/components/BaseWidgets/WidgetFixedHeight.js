import WidgetFullHeight from "./WidgetFullHeight";
import AppColors from "../../constants/AppColors";

export default function WidgetFixedHeight({ children, className = "", lightModeBg = AppColors.WidgetBgLight, darkModeBg = AppColors.WidgetBgDark, height = 150 }) {    
    return (
        <div style={{height: height}}>
            <WidgetFullHeight
                className={className}
                lightModeBg={lightModeBg}
                darkModeBg={darkModeBg}
            >
                {children}
            </WidgetFullHeight>
        </div>
    );
}