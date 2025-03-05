import UserPreferences from "../scripts/UserPreferences";
import AppColors from "../constants/AppColors";

export default function Textarea({id, name, value, rows, className = "", onChange = () => {},}){
    
    return (
        <textarea
            style={{
                background: UserPreferences.darkMode ? AppColors.WidgetBgDark : AppColors.WidgetBgLight,
                color: UserPreferences.darkMode ? AppColors.TextColorDark : AppColors.TextColorLight
            }} 
            className={className}
            onChange={onChange}
            id={id}
            name={name}
            value={value}
            rows={rows}
        />
    );
}