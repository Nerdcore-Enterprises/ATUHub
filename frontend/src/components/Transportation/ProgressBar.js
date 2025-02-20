import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProgressBar({barIcon, endIcon, currentProgress}){
    const [progressPercent, setProgressPercent] = useState(Math.floor(currentProgress * 100));

    return (
        <div className="w-full">
            <div className="w-full h-6 relative">
                <FontAwesomeIcon icon={barIcon} className={"text-2xl absolute translate-x-[-50%]"} style={{marginLeft: progressPercent + "%"}}/>
                <FontAwesomeIcon icon={endIcon} className="text-2xl absolute translate-x-[-50%] inset-x-[100%]" />
            </div>
            <progress
                className="w-full overflow-hidden rounded-lg"
                value={currentProgress}
                max={1}
            ></progress>
        </div>
    );
}