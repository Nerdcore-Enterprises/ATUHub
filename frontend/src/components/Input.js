import UserPreferences from "../scripts/UserPreferences";
import AppColors from "../constants/AppColors";

export default function Input({className = "", type = "", placeholder = "", onChange = () => {}}){
    
    return (
        <input
            style={{
                background: UserPreferences.darkMode ? AppColors.WidgetBgDark : AppColors.WidgetBgLight,
                color: UserPreferences.darkMode ? "white" : "black"
            }} 
            className={className}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
}