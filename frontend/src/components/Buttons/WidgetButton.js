import AppColors from "../../constants/AppColors";
import Widget from "../BaseWidgets/Widget";

export default function WidgetButton({ children, className = "", lightModeBg = AppColors.WidgetBgLight, darkModeBg = AppColors.WidgetBgDark, selectedColor = AppColors.AtuGold, onClick = () => {} }) {
    
    
    return (
        <>
            <div className={"w-full h-full " + className} onClick={onClick}>
                <Widget
                    className={'cursor-pointer ' + className}
                    lightModeBg={lightModeBg}
                    darkModeBg={darkModeBg}
                >
                    {children}
                </Widget>
            </div>
        </>
    );
}
