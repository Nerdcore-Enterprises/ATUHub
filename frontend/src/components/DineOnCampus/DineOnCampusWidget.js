import { useNavigate } from "react-router-dom";
import Widget from "../Widget";
import logo from '../../assets/icons/DineOnCampus.svg';

export default function DineOnCampusWidget({ earliestStart, latestEnd }) {
    const navigate = useNavigate();

    const handleNav = (path) => {
        navigate(path);
    };

    return (
        <Widget>
            <div className="flex flex-row items-center my-4 mx-6">
                <img src={logo} alt="DineOnCampus" className="w-8 h-auto" />
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
                <button onClick={() => handleNav('../dineoncampus')} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                    View Full Hours
                </button>
            </div>
        </Widget>
    );
}
