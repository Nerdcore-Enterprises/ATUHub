import Widget from "./Widget";
import AppColors from "../../constants/AppColors";

export default function StickyWidget({ children, className = "", lightModeBg = AppColors.WidgetBgLight, darkModeBg = AppColors.WidgetBgDark }){
    return (
        <Widget className={"sticky top-[5vh] self-start " + className} lightModeBg={lightModeBg} darkModeBg={darkModeBg}>
            {children}
        </Widget>
    );
}
