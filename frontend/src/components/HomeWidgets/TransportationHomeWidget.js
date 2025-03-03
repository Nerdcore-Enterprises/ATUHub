import Widget from "../BaseWidgets/Widget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faCarSide, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProgressBar from "../Transportation/ProgressBar";
import NavButton from "../Buttons/NavButton";
import HomeWidget from "../BaseWidgets/HomeWidget";

export default function TransportationHomeWidget(){
    const [progressPercent, setProgressPercent] = useState(.5);
    const [driverName, setDriverName] = useState("I'm da driver");
    const [hasDriver, setHasDriver] = useState(true);

    return (
        <HomeWidget>
            <div className="flex flex-row items-center my-4 mx-6 mb-0">
                <FontAwesomeIcon icon={faCar} className="mr-4 text-4xl" />
                <p className="text-3xl font-semibold ml-auto text-right relative">
                    Transporation
                    <br/>
                    {
                        hasDriver &&
                        <p className="text-lg font-semibold ml-auto text-right absolute right-0">driver: {driverName}</p>
                    }
                </p>
            </div>
            {
                hasDriver &&
                <div className="flex flex-row items-center my-4 mx-6 translate-y-3">
                    <ProgressBar
                        barIcon = {faCarSide}
                        endIcon = {faUser}
                        currentProgress = {progressPercent}
                    />
                </div>
            }
            {
                !hasDriver &&
                <div className="flex flex-row items-center my-4 mx-6">
                    <NavButton to={'../transportation'} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        Select Destination
                    </NavButton>
                </div>
            }
        </HomeWidget>
    );
}