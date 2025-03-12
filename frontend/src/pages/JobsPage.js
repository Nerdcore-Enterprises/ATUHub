import React, { useState, useEffect } from 'react';
import GenericPage from '../components/genericPage';
import JobWidget from '../components/JobSearch/JobWidget';
import ResponsiveFullWidget from '../components/JobSearch/ResponsiveFullWidget';
import GenericModal from '../components/GenericModal/GenericModal';
import GenericErrorPage from '../components/GenericErrorPage/GenericErrorPage';
import GenericLoadingPage from '../components/GenericErrorPage/GenericLoadingPage';
import SearchBar from '../components/SearchBar';
import JobApplyInfo from '../components/JobSearch/JobApplyInfo';
import JobInfo from '../components/JobSearch/JobInfo';
import VerticalWidgetList from '../components/WidgetContainers/VerticalWidgetList';
import HeaderWithBack from '../components/HeaderWithBack';
import GenericSidebar from '../components/Sidebar/GenericSidebar';
import Input from '../components/Input';
import HorizontalWidgetList from '../components/WidgetContainers/HorizontalWidgetList';
import WidgetBullet from '../components/Buttons/WidgetBullet';
import ContentHeader from '../components/ContentHeader';

export default function JobsPage() {
    const [jobIndex, setJobIndex] = useState(-1);
    const [jobs, setJobs] = useState();
    const [applyVisible, setApplyVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [typeFilter, setTypeFilter] = useState({});
    const [minMoneyFilter, setMinMoneyFilter] = useState(0);
    const [salaryTypeFilter, setSalaryTypeFilter] = useState({});
    const fetchJobData = async () => {
        try {
            const response = await fetch('/api/jobs');
            const data = await response.json();
            if (data) {
                setJobs(data.jobs);
                initTypeFilters(data.jobs);
            }
        } catch {
            console.error("Failed to fetch jobs")
        }
    }

    const initTypeFilters = (jobs) => {
        let newTypeFilters = {};
        let newSalaryTypeFilters = {};
        for (let i = 0; i < jobs.length; i++){
            if (!(jobs[i].Type in newTypeFilters)){
                newTypeFilters[jobs[i].Type] = true;
            }
            if (!(jobs[i].SalaryType in newSalaryTypeFilters)){
                newSalaryTypeFilters[jobs[i].SalaryType] = true;
            }
        }
        setTypeFilter(newTypeFilters);
        setSalaryTypeFilter(newSalaryTypeFilters);
    }

    const handleFilterChange = (key, setter) => {
        // const checked = e.target.checked;

        setter(prevState => ({...prevState, [key]: !prevState[key]}));
    }

    useEffect(() => {
        fetchJobData();
        if (window.innerWidth >= 1024) {
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
        <>
            <GenericPage>
                <HeaderWithBack>Jobs</HeaderWithBack>
                <SearchBar
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    onFilterClick={() => setFiltersOpen(true)}
                />
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
                        <VerticalWidgetList className='lg:w-1/2 lg:min-w-[50%]'>
                            {
                                jobs.map((data, index) => {
                                    // Filters
                                    if (!data.Name.toLowerCase().includes(searchQuery.toLowerCase())) return (<></>);
                                    if (typeFilter[data.Type] === false) return (<></>);
                                    if (salaryTypeFilter[data.SalaryType] === false) return (<></>);
                                    if (Number(data.Salary) < minMoneyFilter) return (<></>);

                                    return (
                                        <JobWidget key={index} jobData={data} onClick={() => onJobClick(index)} />
                                    );
                                })
                            }
                        </VerticalWidgetList>
                        <ResponsiveFullWidget onClose={() => setJobIndex(-1)} visible={jobIndex >= 0}>
                            {jobIndex >= 0 &&
                                <>
                                    <JobInfo
                                        jobInfo={jobs[jobIndex]}
                                        setApplyVisible={setApplyVisible}
                                    />
                                    <GenericModal
                                        visible={applyVisible}
                                        onClose={() => { setApplyVisible(false) }}
                                        fitContent={true}
                                    >
                                        <JobApplyInfo
                                            jobInfo={jobs[jobIndex]}
                                        />
                                    </GenericModal>
                                </>
                            }
                        </ResponsiveFullWidget>
                    </div>
                }
            </GenericPage>
            <GenericSidebar open={filtersOpen} setOpen={setFiltersOpen} side='right' minSize='40vw'>
                <div className='w-full flex flex-row'>
                    <h1 className='text-3xl font-semibold'>Filters</h1>
                    <div className='w-full'>
                        <div className='relative'>
                            <button className="absolute right-0 text-3xl font-semibold" onClick={() => setFiltersOpen(false)}>X</button>
                        </div>
                    </div>
                </div>
                <br></br>
                <ContentHeader>Job Type</ContentHeader>
                <HorizontalWidgetList className='w-full justify-between'>
                    {Object.entries(typeFilter).map(([key, value]) => {
                        return (
                            <>
                                <WidgetBullet
                                    key={key}
                                    className='text-center rounded-none'
                                    selected={typeFilter[key]}
                                    onClick={() => {handleFilterChange(key, setTypeFilter)}}
                                >
                                    {key}
                                </WidgetBullet>
                            </>
                        );
                    })}
                </HorizontalWidgetList>
                <ContentHeader>Pay Type</ContentHeader>
                <HorizontalWidgetList className='w-full justify-between'>
                    {Object.entries(salaryTypeFilter).map(([key, value]) => {
                        // console.log(typeFilter)
                        return (
                            <>
                                <WidgetBullet
                                    key={key}
                                    className='text-center rounded-none'
                                    selected={salaryTypeFilter[key]}
                                    onClick={() => {handleFilterChange(key, setSalaryTypeFilter)}}
                                >
                                    {key}
                                </WidgetBullet>
                            </>
                        );
                    })}
                </HorizontalWidgetList>
                <ContentHeader>Min Pay</ContentHeader>
                    <Input
                        className='w-full px-4 py-2'
                        type='number'
                        value={minMoneyFilter}
                        onChange={(e) => {setMinMoneyFilter(e.target.value)}}
                    />
            </GenericSidebar>
        </>
    );
}
