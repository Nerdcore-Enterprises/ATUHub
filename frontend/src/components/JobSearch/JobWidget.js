import { useCallback, useState, useEffect } from "react";
import Widget from "../BaseWidgets/Widget";
import GreenButton from "../Buttons/GreenButton";
import TagDisplay from "../TagDisplay";

export default function JobWidget({ jobData, onClick }) {
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
        if (jobData.SalaryType === 'Hourly') {
            output.push(`$${jobData.Salary} per hour`);
        } else if (jobData.SalaryType === 'Contract') {
            output.push(`$${jobData.Salary}`);
        } else {
            output.push(`$${jobData.Salary}`);
        }
        output.push(jobData.Type);
        return output;
    }, [jobData]);

    useEffect(() => {
        setTagData(fetchTags());
    }, [fetchTags]);

    return (
        <Widget>
            <div className="my-4 mx-6 space-y-4">
                <p className="text-3xl font-semibold mb-3">
                    {jobData.Name}
                </p>
                <p>{jobData.Address}</p>
                <TagDisplay
                    tags={tagData}
                />
                {/* <div className="flex space-x-4 rounded-b-[1rem] overflow-x-auto weather-scroll">
                    {tagData.map((tag, index) => (
                        <div key={index} className="bg-[#333333] text-white rounded-[2rem] flex flex-col items-center2 pr-4 pl-4 pt-2 pb-2">
                            <p>{tag}</p>
                        </div>
                    ))}
                </div> */}
                <div className="flex flex-row">
                    <p className="align-middle w-1/2 mt-auto mb-auto">Posted {dateDifference()} days ago</p>
                    <GreenButton onClick={() => onClick()} className="w-1/2 ml-auto">
                        View
                    </GreenButton>
                </div>
            </div>
        </Widget>
    );
}