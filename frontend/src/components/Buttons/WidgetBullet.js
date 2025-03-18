import AppColors from "../../constants/AppColors";
import WidgetButton from "./WidgetButton";

export default function WidgetBullet({ children, className = "", lightModeBg = AppColors.WidgetBgLight, darkModeBg = AppColors.WidgetBgDark, selectedBgColor = AppColors.AtuGold, selected = false, onClick = () => {} }) {
    return (
        <>
            <WidgetButton
                className={'cursor-pointer whitespace-nowrap ' + className}
                lightModeBg={selected ? selectedBgColor : lightModeBg}
                darkModeBg={selected ? selectedBgColor : darkModeBg}
                onClick={onClick}
            >
                <div className={selected ? "text-black font-semibold" : ""}>
                    {children}
                </div>
            </WidgetButton>
        </>
    );
}
