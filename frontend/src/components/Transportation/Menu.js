import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import NavButton from "../Buttons/NavButton";
import HomeWidget from "../BaseWidgets/HomeWidget";
import GreenButton from "../Buttons/GreenButton";
import TransportationHomeWidget from "../HomeWidgets/TransportationHomeWidget";

export default function Menu({ setInfoVisible }) {
    return (
        <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4'>
            <TransportationHomeWidget />
            <HomeWidget>
                <div className="flex flex-row items-center my-4 mx-6 mb-0">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-4 text-4xl" />
                    <p className="text-3xl font-semibold ml-auto text-center">Request a ride?</p>
                </div>
                <div className="flex flex-row items-center my-4 mx-6">
                    <NavButton to={'./map'} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        Select Location
                    </NavButton>
                </div>
            </HomeWidget>
            <HomeWidget>
                <div className="flex flex-row items-center my-4 mx-6 mb-0">
                    <FontAwesomeIcon icon={faCar} className="mr-4 text-4xl" />
                    <p className="text-3xl font-semibold ml-auto text-center">Want to become a driver?</p>
                </div>
                <div className="flex flex-row items-center my-4 mx-6">
                    <GreenButton onClick={() => { setInfoVisible(true) }} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        Apply Information
                    </GreenButton>
                </div>
            </HomeWidget>
            {/* Check if driver, and show widget */}
        </div>
    )
}