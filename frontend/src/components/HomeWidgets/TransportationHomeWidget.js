import { faCar } from "@fortawesome/free-solid-svg-icons";
import NavButton from "../Buttons/NavButton";
import HomeWidget from "../BaseWidgets/HomeWidget";

export default function TransportationHomeWidget() {

    return (
        <HomeWidget
            title="Transportation"
            icon={faCar}
        >
            <div className="flex flex-row items-center my-4 mx-6">
                <NavButton to={'../transportation'} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                    View Transportation
                </NavButton>
            </div>
        </HomeWidget>
    );
}