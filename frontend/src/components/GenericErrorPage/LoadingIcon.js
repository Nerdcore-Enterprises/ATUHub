import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./LoadingIcon.css"

export default function LoadingIcon(){
    return (
        <FontAwesomeIcon icon={faSpinner} className="text-7xl mt-4 spinner"/>
    );
}