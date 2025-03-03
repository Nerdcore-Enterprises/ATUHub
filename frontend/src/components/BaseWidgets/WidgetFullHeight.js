import Widget from "./Widget";

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