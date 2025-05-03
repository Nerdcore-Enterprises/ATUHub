import UserPreferences from "../scripts/UserPreferences";
import AppColors from "../constants/AppColors";

export default function Input({id, name, value, className = "", type = "", placeholder = "", onChange = () => {},}) {
    return (
        <input
            style={{
                background: UserPreferences.darkMode ? AppColors.WidgetBgDark : AppColors.WidgetBgLight,
                color: UserPreferences.darkMode ? AppColors.TextColorDark : AppColors.TextColorLight
            }} 
            className={className}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            id={id}
            name={name}
            value={value}
        />
    );
}