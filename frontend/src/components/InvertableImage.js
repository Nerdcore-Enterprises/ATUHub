import UserPreferences from "../scripts/UserPreferences";

export default function InvertableImage({src, alt, className, reverse = false}){
    return(
        <img className={className} src={src} alt={alt} style={((UserPreferences.darkMode && !reverse) || (!UserPreferences.darkMode && reverse)) ?{filter: 'invert(1)'} : {}}/>
    );
}