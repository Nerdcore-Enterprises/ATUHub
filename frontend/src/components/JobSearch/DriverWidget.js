import Widget from "../homeWidget";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function DriverWidget({ driverData, onClick }) {
    const [tagData, setTagData] = useState([]);

    const getStars = () => {
        let output = []
        let numEmptyStars = 5 - driverData.rating;

        for (var a = 0; a < driverData.rating; a++) {
            output.push(
                <FontAwesomeIcon icon={faStar} color="#FFCD00" size="2x" className="mr-4" />
            );
        }

        for (var b = 0; b < numEmptyStars; b++) {
            output.push(
                <FontAwesomeIcon icon={faStar} color="#222" size="2x" className="mr-4" />
            );
        }

        return output;
    }

    // setTagData(null); // Remove eslint warning. Remove this line when you implement the tag data.

    return (
        <Widget>
            <div className="my-4 mx-6">
                <p className="text-3xl font-semibold mb-3">
                    {driverData.firstName + " " + driverData.lastName}
                </p>
                <div className="flex">
                    {
                        getStars()
                    }
                </div>
                <div className="flex space-x-4 rounded-b-[1rem] overflow-x-auto weather-scroll">
                    {tagData.map((tag, index) => (
                        <div key={index} className="bg-[#333333] text-white rounded-[2rem] flex flex-col items-center2 pr-4 pl-4 pt-2 pb-2">
                            <p>{tag}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row">
                    <button onClick={() => onClick()} className="bg-[var(--ATUGreen)] ml-auto w-1/2 rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                        View
                    </button>
                </div>
            </div>
        </Widget>
    );
}