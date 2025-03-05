// import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Widget from "../BaseWidgets/Widget";
import GreenButton from "../Buttons/GreenButton";

export default function DineOnCampusWidget({ locations, earliestStart, latestEnd, title }) {

    const isChambers = locations.some(location => location.name.includes("Chamber's"));

    return (
        <Widget className="items-left space-y-2 px-5 py-4">
            <h2 className="font-bold text-2xl">{title}</h2>
            <div className="font-normal text-lg p-2">
                {earliestStart && latestEnd ? (
                    <>
                        {earliestStart} - {latestEnd}
                    </>
                ) : (
                    <span className="text-zinc-500 font-bold">Loading...</span>
                )}
            </div>

            {locations.map((location, index) => {
                let statusMessage = location.statusMessage;

                if (!location.isOpen && location.openingTimeInMinutes !== null) {
                    const now = new Date();
                    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
                    const minutesToOpen = location.openingTimeInMinutes - currentTimeInMinutes;

                    if (minutesToOpen > 0 && minutesToOpen < 60) {
                        statusMessage = `Opening in ${minutesToOpen} minutes`;
                    }
                }

                return (
                    <div key={index} className="flex flex-row items-center bg-zinc-800 h-10 w-full rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        <p className="font-normal text-white text-xl ml-4 mr-auto">
                            {location.name}
                        </p>
                        <div className={`flex flex-row items-center h-10 rounded-r-full bg-gradient-to-r from-5% from-transparent to-10% ${location.isOpen ? 'to-green-500' : (statusMessage.includes('Opening') ? 'to-yellow-300' : 'to-red-500')}`}>
                            <p className="font-normal text-black text-md mx-8 text-right">
                                {statusMessage}
                            </p>
                        </div>
                    </div>
                );
            })}

            {isChambers && (
                <div className="flex justify-end w-full">
                    <a href="https://dineoncampus.com/arkansastech/whats-on-the-menu" target="_blank" rel="noopener noreferrer" className="flex items-center text-xl">
                        <GreenButton>
                            View Menu
                            <FontAwesomeIcon icon={faUpRightFromSquare} className="ml-3" />
                        </GreenButton>
                    </a>
                </div>
            )}
        </Widget>
    );
}