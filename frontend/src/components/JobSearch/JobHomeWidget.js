import Widget from "../BaseWidgets/Widget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import NavButton from "../Buttons/NavButton";

export default function JobHomeWidget(){
    const [numNewJobs, setNumNewJobs] = useState(0);
    const consideredNewLimit = 7;

    const dateDifference = (job) => {
        const currentDate = new Date();

        const postedDate = new Date(job.CreatedAt);
        const diffInMs = currentDate.getTime() - postedDate.getTime();
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.floor(diffInMs / msPerDay);
    }

    const fetchJobData = async() => {
        try {
            const response = await fetch('/api/jobs');
            const data = await response.json();
            if (data){
                const jobs = data.jobs;
                let newJobs = 0;
                for (let i = 0; i < jobs.length; i++){
                    if (dateDifference(jobs[i]) <= consideredNewLimit){
                        newJobs++;
                    }
                }
                setNumNewJobs(newJobs);
            }
        } catch {
            console.error("Failed to fetch jobs")
        }
    }

    useEffect(() => {
        fetchJobData();
    }, []);

    return (
        <Widget>
            <div className="flex flex-row items-center my-4 mx-6 mb-0">
                <FontAwesomeIcon icon={faBriefcase} className="mr-4 text-4xl" />
                <p className="text-3xl font-semibold ml-auto text-center">
                    {
                        numNewJobs > 0 &&
                        <>{numNewJobs} New Jobs Hiring</>
                    }
                    {
                        numNewJobs <= 0 &&
                        <>Check Out Jobs</>
                    }
                </p>
            </div>
            <div className="flex flex-row items-center my-4 mx-6">
                <NavButton to={'../jobs'} className="bg-[var(--ATUGreen)] ml-auto w-fit rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                    View
                </NavButton>
            </div>
        </Widget>
    );
}