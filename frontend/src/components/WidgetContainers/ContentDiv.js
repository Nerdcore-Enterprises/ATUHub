import UserPreferences from "../../scripts/UserPreferences";
import AppColors from "../../constants/AppColors";

export default function ContentDiv({children, className = "", lightModeBg = AppColors.PageBgLight, darkModeBg = AppColors.PageBgDark}) {
    return (
        <div 
            className={className}
            style={{
                background: UserPreferences.darkMode ? darkModeBg : lightModeBg,
                color: UserPreferences.darkMode ? "white" : "black"
            }} 
        >
            {children}
        </div>
    );
}