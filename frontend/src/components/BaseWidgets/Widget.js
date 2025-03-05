import AppColors from "../../constants/AppColors";
import UserPreferences from "../../scripts/UserPreferences";

export default function Widget({ children, className = "", lightModeBg = AppColors.WidgetBgLight, darkModeBg = AppColors.WidgetBgDark }) {
    return (
        <>
            <div
                style={{
                    background: UserPreferences.darkMode ? darkModeBg : lightModeBg,
                    color: UserPreferences.darkMode ? AppColors.TextColorDark : AppColors.TextColorLight
                }} 
                className={"flex flex-col rounded-[2rem] px-2 w-full h-fit shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] mt-2 p-2 " + className}>
                {children}
            </div>
        </>
    );
}
