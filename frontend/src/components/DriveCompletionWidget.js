import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faCarSide, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProgressBar from "./Transportation/ProgressBar";
import HomeWidget from "./BaseWidgets/HomeWidget";
import NavButton from "./Buttons/NavButton";

export default function DriveCompletionWidget({}){
    // eslint-disable-next-line
    const [progressPercent, setProgressPercent] = useState(.5);
    // eslint-disable-next-line
    const [driverName, setDriverName] = useState("Dylan Dover");
    // eslint-disable-next-line
    const [hasDriver, setHasDriver] = useState(true);

    return (
        <HomeWidget
            title="Current Drive"
            icon={faCar}
        >
            {
                hasDriver &&
                <div className="w-full h-0">
                    <p className="text-lg font-semibold ml-auto text-right mr-6">Driver:
                        <span className="text-sm font-normal ml-1">{driverName}</span>
                    </p>
                </div>
            }
            {
                hasDriver &&
                <div className="flex flex-row items-center my-4 mx-6 translate-y-3">
                    <ProgressBar
                        barIcon={faCarSide}
                        endIcon={faUser}
                        currentProgress={progressPercent}
                    />
                </div>
            }
            {
                !hasDriver &&
                <div className="flex flex-row items-center my-4 mx-6">
                    No drive in progress
                </div>
            }
        </HomeWidget>
    );
}