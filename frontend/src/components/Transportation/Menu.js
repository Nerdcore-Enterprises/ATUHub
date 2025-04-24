import { faCar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import NavButton from "../Buttons/NavButton";
import HomeWidget from "../BaseWidgets/HomeWidget";
import GreenButton from "../Buttons/GreenButton";
import DriveCompletionWidget from "../DriveCompletionWidget";

export default function Menu({ setInfoVisible }) {
    return (
        <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4'>
            <DriveCompletionWidget/>
            <HomeWidget
                title="Request a ride?"
                icon={faLocationDot}
            >
                <div className="flex flex-row items-center my-4 mx-6">
                    <NavButton to={'./map'} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        Select Location
                    </NavButton>
                </div>
            </HomeWidget>
            <HomeWidget
                title="Want to become a driver?"
                icon={faCar}
            >
                <div className="flex flex-row items-center my-4 mx-6">
                    <GreenButton onClick={() => { setInfoVisible(true) }} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        Apply Information
                    </GreenButton>
                </div>
            </HomeWidget>
        </div>
    )
}