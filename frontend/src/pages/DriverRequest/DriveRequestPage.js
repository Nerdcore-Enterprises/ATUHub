import { useState, useEffect } from "react";
import GenericErrorPage from "../../components/GenericErrorPage/GenericErrorPage";
import GenericLoadingPage from "../../components/GenericErrorPage/GenericLoadingPage";
import GenericPage from "../../components/genericPage";
import Header from "../../components/Header";
import ResponsiveFullWidget from "../../components/JobSearch/ResponsiveFullWidget";
import DriveRequestWidget from "./DriveRequestWidget";
import SearchBar from "../../components/SearchBar";
import VerticalWidgetList from "../../components/WidgetContainers/VerticalWidgetList";
import DriveRequestInfo from "./DriveRequestInfo";

export default function DriveRequestPage() {
    const [requestIndex, setRequestIndex] = useState(-1);
    const [requests, setRequests] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const fetchRequestsData = async() => {
        try {
            // const response = await fetch('/api/jobs');
            // const data = await response.json();
            // if (data){
            //     setRequests(data.jobs);
            // }
            setRequests(
                [
                    {
                        name: "John Doe",
                        location: "Walmart",
                        type: "what?",
                        instructions: "Buy me some milk",
                        pay: 5
                    },
                    {
                        name: "Tim Timmothy",
                        location: "Target",
                        type: "huh?",
                        instructions: "Buy me some eggs",
                        pay: 7
                    },
                    {
                        name: "The Destroyer of Worlds",
                        location: "ATU",
                        type: "idk?",
                        instructions: "Buy me the necronomicon",
                        pay: 500
                    },
                ]
            );
        } catch {
            console.error("Failed to fetch requests")
        }
    }

    useEffect(() => {
        fetchRequestsData();
        if (window.innerWidth >= 1024){ // This sets a default request selection on desktop view
            setRequestIndex(0);
        }
    }, []);

    const onRequestClick = (newIndex) => {
        setRequestIndex(newIndex);
    }

    if (!requests) {
        return (
            <GenericLoadingPage/>
        )
    }

    else if (requests.length === 0){
        return (
            <GenericErrorPage>No Drive Requests Found</GenericErrorPage>
        )
    }

    return (
        <GenericPage>
            <Header>Drive Requests</Header>
            {/* SEARCH */}
            <SearchBar
                query={searchQuery}
                setQuery={setSearchQuery}
            />
            {
                requests.length > 0 &&
                <div className='w-full flex flex-row gap-5'>
                    {/* REQUESTS LIST */}
                    <VerticalWidgetList className='lg:w-1/2 lg:min-w-[50%]'>
                        {
                            requests.map((data, index) => {
                                if (data.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    return(
                                        <DriveRequestWidget key={index} requestData={data} onClick={() => onRequestClick(index)}/>
                                    );
                                return (<></>);
                            })
                        }
                    </VerticalWidgetList>
                    {/* JOB INFORMATION */}
                    {/* <div className='justify-center w-0 lg:w-1/2'> */}
                        <ResponsiveFullWidget onClose={() => setRequestIndex(-1)} visible={requestIndex >= 0}>
                            {requestIndex >= 0 &&
                            <>
                                <DriveRequestInfo
                                    requestInfo={requests[requestIndex]}
                                />
                            </>
                            }
                        </ResponsiveFullWidget>
                    {/* </div> */}
                </div>
                }
        </GenericPage>
    );
}
