import AppColors from "../constants/AppColors";
import UserPreferences from "../scripts/UserPreferences";

export default function FadedText({children}){
    
    return (
        <span
        style={{
            color: UserPreferences.darkMode ? AppColors.TextColorFadedDark : AppColors.TextColorFadedLight
        }} 
        >{children}</span>
    );
}