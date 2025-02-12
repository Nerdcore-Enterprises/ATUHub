import { useCallback, useState, useEffect } from "react";
import Widget from "../homeWidget";

export default function JobWidget({jobData, onClick}){
    const [tagData, setTagData] = useState([]);

    const dateDifference = () => {
        const currentDate = new Date();

        const postedDate = new Date(jobData.CreatedAt);
        const diffInMs = currentDate.getTime() - postedDate.getTime();
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.floor(diffInMs / msPerDay);
    }

    const fetchTags = useCallback(() => {
        let output = [];
        output.push("$" + jobData.Salary + " per hour");
        output.push(jobData.Type);
        return output;
    }, [jobData]);

    useEffect(() => {
        setTagData(fetchTags());
    }, [fetchTags]);

    return(
        <Widget>
            <div className="my-4 mx-6">
                <p className="text-3xl font-semibold mb-3">
                    {jobData.Name}
                </p>
                <p>{jobData.Address}</p>
                <div className="flex space-x-4 rounded-b-[1rem] overflow-x-auto weather-scroll">
                    {tagData.map((tag, index) => (
                        <div key={index} className="bg-[#333333] text-white rounded-[2rem] flex flex-col items-center2 pr-4 pl-4 pt-2 pb-2">
                            <p>{tag}</p>
                        </div>
                    ))}
                </div>
                <br></br>
                    <div className="flex flex-row">
                        <p className="align-middle w-1/2 mt-auto mb-auto">Posted {dateDifference()} days ago</p>
                        <button onClick={() => onClick()} className="bg-[var(--ATUGreen)] ml-auto w-1/2 rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                            View
                        </button>
                    </div>
            </div>
        </Widget>
    );
}