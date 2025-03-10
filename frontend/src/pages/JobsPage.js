import React from 'react';
import { useState, useEffect } from 'react';
import GenericPage from '../components/genericPage';
import JobWidget from '../components/JobSearch/JobWidget';
import Widget from '../components/BaseWidgets/Widget';
import ResponsiveFullWidget from '../components/JobSearch/ResponsiveFullWidget';
import GenericModal from '../components/GenericModal/GenericModal';
import GenericErrorPage from '../components/GenericErrorPage/GenericErrorPage';
import GenericLoadingPage from '../components/GenericErrorPage/GenericLoadingPage';
import SearchBar from '../components/SearchBar';
import HorizontalWidgetList from '../components/WidgetContainers/HorizontalWidgetList';
import JobApplyInfo from '../components/JobSearch/JobApplyInfo';
import JobInfo from '../components/JobSearch/JobInfo';
import VerticalWidgetList from '../components/WidgetContainers/VerticalWidgetList';
import HeaderWithBack from '../components/HeaderWithBack';

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

    const fetchJobData = async () => {
        try {
            const response = await fetch('/api/jobs');
            const data = await response.json();
            if (data) {
                setJobs(data.jobs);
            }
        } catch {
            console.error("Failed to fetch jobs")
        }
    }

    useEffect(() => {
        fetchJobData();
        if (window.innerWidth >= 1024) { // This sets a default job selection on desktop view
            setJobIndex(0);
        }
    }, []);

    const onJobClick = (newIndex) => {
        setJobIndex(newIndex);
    }

    if (!jobs) {
        return (
            <GenericLoadingPage />
        )
    }

    else if (jobs.length === 0) {
        return (
            <GenericErrorPage>No Jobs Found</GenericErrorPage>
        )
    }

    return (
        <GenericPage>
            <HeaderWithBack>Jobs</HeaderWithBack>
            {/* SEARCH */}
            <SearchBar
                query={searchQuery}
                setQuery={setSearchQuery}
            />
            {/* FILTERS */}
            {/* <HorizontalWidgetList>
                {currentFilters.map((filter, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Widget>{filter}</Widget>
                    </div>
                ))}
            </HorizontalWidgetList> */}
            {
                jobs.length > 0 &&
                <div className='w-full flex flex-row gap-5'>
                    {/* JOB LIST */}
                    <VerticalWidgetList className='lg:w-1/2 lg:min-w-[50%]'>
                        {
                            jobs.map((data, index) => {
                                if (data.Name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    return (
                                        <JobWidget key={index} jobData={data} onClick={() => onJobClick(index)} />
                                    );
                                return (<></>);
                            })
                        }
                    </VerticalWidgetList>
                    {/* JOB INFORMATION */}
                    <ResponsiveFullWidget onClose={() => setJobIndex(-1)} visible={jobIndex >= 0}>
                        {jobIndex >= 0 &&
                            <>
                                <JobInfo
                                    jobInfo={jobs[jobIndex]}
                                    setApplyVisible={setApplyVisible}
                                />
                                {/* Apply info modal */}
                                <GenericModal
                                    visible={applyVisible}
                                    onClose={() => { setApplyVisible(false) }}
                                    className='w-[60vw] max-w-[768px]'
                                >
                                    <JobApplyInfo
                                        jobInfo={jobs[jobIndex]}
                                    />
                                </GenericModal>
                            </>
                        }
                    </ResponsiveFullWidget>
                    {/* </div> */}
                </div>
            }
        </GenericPage>
    );
}
