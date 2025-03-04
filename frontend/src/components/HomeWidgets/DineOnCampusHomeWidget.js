import Widget from "../BaseWidgets/Widget";
import logo from '../../assets/icons/DineOnCampus.svg';
import NavButton from "../Buttons/NavButton";
import HomeWidget from "../BaseWidgets/HomeWidget";
import InvertableImage from "../InvertableImage";

export default function DineOnCampusHomeWidget({ earliestStart, latestEnd }) {
    return (
        <HomeWidget>
            <div className="flex flex-row items-center my-4 mx-6">
                <InvertableImage src={logo} alt="DineOnCampus" className="w-8 h-auto" />
                <p className="text-3xl font-semibold ml-auto text-center">
                    Dine on Campus
                </p>
            </div>
            <div className="flex flex-row items-center mb-4 mx-6">
                <div className="flex flex-col text-left">
                    <p className="text-left font-semibold">
                        Open Today:
                    </p>
                    {earliestStart && latestEnd ? (
                        <p className="text-left">
                            {earliestStart} - {latestEnd}
                        </p>
                    ) : (
                        <span className="text-zinc-500 font-bold">Loading...</span>
                    )}
                </div>
                <NavButton to={'../dineoncampus'} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                    View Full Hours
                </NavButton>
            </div>
        </HomeWidget>
    );
}
