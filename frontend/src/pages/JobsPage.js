import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/header';
import GenericPage from '../components/genericPage';
import JobWidget from '../components/JobSearch/JobWidget';
import Widget from '../components/homeWidget';
import ResponsiveFullWidget from '../components/JobSearch/ResponsiveFullWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import GenericModal from '../components/GenericModal/GenericModal';
import GenericErrorPage from '../components/GenericErrorPage/GenericErrorPage';
import GenericLoadingPage from '../components/GenericErrorPage/GenericLoadingPage';

export default function JobsPage() {
    const [jobIndex, setJobIndex] = useState(-1);
    const [jobs, setJobs] = useState();
    const [applyVisible, setApplyVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const currentFilters = [
        'current',
        'filters',
        'here'
    ]

    const fetchJobData = async() => {
        try {
            const response = await fetch('/api/jobs');
            const data = await response.json();
            if (data){
                setJobs(data.jobs);
            }
        } catch {
            console.error("Failed to fetch jobs")
        }
    }

    useEffect(() => {
        fetchJobData();
    }, []);

    const onJobClick = (newIndex) => {
        setJobIndex(newIndex);
    }

    if (!jobs) {
        return (
            <GenericLoadingPage/>
        )
    }

    else if (jobs.length === 0){
        return (
            <GenericErrorPage>No Jobs Found</GenericErrorPage>
        )
    }

    return (
        <GenericPage>
            <Header title="Jobs" />
            {/* SEARCH */}
            <Widget>
                <div className='flex px-5 justify-center'>
                    <div className='content-center cursor-pointer' onClick={() => {console.log("search code here")}}>
                        <FontAwesomeIcon
                            icon={faSearch}
                            size='lg'
                        />
                    </div>
                    <input
                        className='py-2 px-4 flex-1 text-lg'
                        type='input'
                        placeholder='Search'
                        onChange={(e) => {setSearchQuery(e.target.value)}}
                    />
                    <div className='content-center cursor-pointer' onClick={() => {console.log("filter code here")}}>
                        <FontAwesomeIcon
                            icon={faFilter}
                            size='lg'
                        />
                    </div>
                </div>
            </Widget>
            {/* FILTERS */}
            <div className="flex space-x-4 rounded-b-[1rem] overflow-visible">
                {currentFilters.map((filter, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Widget>{filter}</Widget>
                    </div>
                ))}
            </div>
            {
                jobs.length > 0 &&
                <div className='w-full flex flex-row gap-5'>
                    {/* JOB LIST */}
                        <div className='justify-center w-full lg:w-1/2 lg:min-w-[50%] '>
                            {
                                jobs.map((data, index) => {
                                    if (data.Name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        return(
                                            <JobWidget key={index} jobData={data} onClick={() => onJobClick(index)}/>
                                        );
                                    return (<></>);
                                })
                            }
                        </div>
                    {/* JOB INFORMATION */}
                    {/* <div className='justify-center w-0 lg:w-1/2'> */}
                        <ResponsiveFullWidget onClose={() => setJobIndex(-1)} visible={jobIndex >= 0}>
                            <div className=" mb-4 mt-2 mx-10 h-[100%] flex flex-col">
                                {jobIndex >= 0 &&
                                <>
                                    <div className='grow overflow-auto pb-10'>
                                        <p className="text-3xl font-semibold mb-3">
                                            {jobs[jobIndex].Name}
                                        </p>
                                        <p>{jobs[jobIndex].Description}</p>
                                    </div>
                                    <hr className='mb-4'></hr>
                                    <div className='h-fit py-2'>
                                        {jobs[jobIndex].applyExternally &&
                                            <a href={jobs[jobIndex].ContactInfo}>
                                                <button className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                                                    Apply Externally
                                                </button>
                                            </a>
                                        }
                                        {!jobs[jobIndex].applyExternally &&
                                            <button onClick={() => {setApplyVisible(true)}} className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                                                Apply Information
                                            </button>
                                        }
                                    </div>
                                    {/* Apply info modal */}
                                    <GenericModal
                                        visible={applyVisible}
                                        onClose={() => {setApplyVisible(false)}}
                                        fitContent={true}
                                        >
                                        <h1 className='text-center'>Contact to Apply</h1>
                                        <br/>
                                        <div className='px-4 py-2 flex flex-row w-full justify-evenly gap-10'>
                                            <div>
                                                <h1 className='text-center'>Contact:</h1> 
                                                <br/>                          
                                                <a href={"mailto:" + jobs[jobIndex].ContactInfo} className='underline text-blue-500 text-2xl' >{jobs[jobIndex].ContactInfo}</a>
                                            </div>
                                            <div>
                                                <h1 className='text-center'>Requirements:</h1>
                                                <br/>
                                                {jobs[jobIndex].Requirements}
                                                {/* <ul>
                                                    {jobs[jobIndex].requirements.map((requirement, key) => {
                                                        return (
                                                            <li key={key}>{requirement}</li>
                                                        );
                                                    })}
                                                </ul> */}
                                            </div>
                                        </div>
                                    </GenericModal>
                                </>
                                }
                            </div>
                        </ResponsiveFullWidget>
                    {/* </div> */}
                </div>
                }
        </GenericPage>
    );
}
