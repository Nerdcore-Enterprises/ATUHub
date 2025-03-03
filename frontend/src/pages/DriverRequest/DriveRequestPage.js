import { useState, useEffect } from "react";
import GenericErrorPage from "../../components/GenericErrorPage/GenericErrorPage";
import GenericLoadingPage from "../../components/GenericErrorPage/GenericLoadingPage";
import GenericPage from "../../components/genericPage";
import Header from "../../components/header";
import Widget from "../../components/BaseWidgets/Widget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ResponsiveFullWidget from "../../components/JobSearch/ResponsiveFullWidget";
import DriveRequestWidget from "./DriveRequestWidget";

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
            <Header title="Drive Requests" />
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
                </div>
            </Widget>
            {
                requests.length > 0 &&
                <div className='w-full flex flex-row gap-5'>
                    {/* JOB LIST */}
                        <div className='justify-center w-full lg:w-1/2 lg:min-w-[50%] '>
                            {
                                requests.map((data, index) => {
                                    if (data.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        return(
                                            <DriveRequestWidget key={index} requestData={data} onClick={() => onRequestClick(index)}/>
                                        );
                                    return (<></>);
                                })
                            }
                        </div>
                    {/* JOB INFORMATION */}
                    {/* <div className='justify-center w-0 lg:w-1/2'> */}
                        <ResponsiveFullWidget onClose={() => setRequestIndex(-1)} visible={requestIndex >= 0} className="bg-zinc-300" desktopClass="shadow-none" mobileClass="px-16">
                            <div className="h-[100%] flex flex-col">
                                {requestIndex >= 0 &&
                                <>
                                    <div className='grow overflow-visible pb-10'>
                                        <Widget>
                                            <p className="text-3xl font-semibold py-2 px-4">
                                                {requests[requestIndex].name}
                                            </p>
                                        </Widget>
                                        <br></br>
                                        <Widget>
                                            <div className="px-4 flex flex-row justify-between">
                                                <p>Drive Location: </p>
                                                <p>{requests[requestIndex].location}</p>
                                            </div>
                                        </Widget>
                                        <Widget>
                                            <div className="px-4 flex flex-row justify-between">
                                                <p>Drive Type: </p>
                                                <p>{requests[requestIndex].type}</p>
                                            </div>
                                        </Widget>
                                        <Widget>
                                            <div className="px-4">
                                                <p>Drive Type: </p>
                                                <p className="min-h-60">{requests[requestIndex].instructions}</p>
                                            </div>
                                        </Widget>
                                        <Widget>
                                            <div className="px-4 flex flex-row justify-between">
                                                <p>Drive Pay: </p>
                                                <p>${requests[requestIndex].pay}</p>
                                            </div>
                                        </Widget>
                                    </div>
                                    <hr className='mb-4'></hr>
                                    <div className='h-fit py-2 flex flex-row gap-4'>
                                        <button className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                                            Accept Drive
                                        </button>
                                        <button className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                                            Decline Drive
                                        </button>
                                    </div>
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
