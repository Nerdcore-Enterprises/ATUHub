import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ResponsiveFullWidget from "../components/JobSearch/ResponsiveFullWidget";
import DriverWidget from "../components/Transportation/DriverWidget";
// import { useLocation } from "react-router-dom";
import GenericErrorPage from "../components/GenericErrorPage/GenericErrorPage";
import GenericLoadingPage from "../components/GenericErrorPage/GenericLoadingPage";
import { useState, useEffect } from "react";
import GenericPage from "../components/genericPage";
import Header from '../components/header';
import Widget from '../components/BaseWidgets/Widget';

export default function PickDriverPage() {
    const [driverIndex, setDriverIndex] = useState(-1);
    const [drivers, setDrivers] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // commented to remove eslint. This is how we get the coordinates from previous page. also uncomment import
    // const location = useLocation();
    // const coords = location.state; 

    const fetchDriverData = async () => {
        try {
            const response = await fetch('/api/drivers-names');
            const data = await response.json();

            setDrivers(data.drivers || []);
        } catch {
            console.error("Failed to fetch drivers");
            setDrivers([]);
        }
    };

    useEffect(() => {
        fetchDriverData();
    })

    const onDriverClick = (newIndex) => {
        setDriverIndex(newIndex);
    }
    
    if (!drivers) {
        return (
            <GenericLoadingPage/>
        )
    }

    else if (drivers.length === 0){
        return (
            <GenericErrorPage>No Drivers Found</GenericErrorPage>
        )
    }

    return (
        <GenericPage>
            <Header>Pick a driver</Header>
            {/* Search */}
            <Widget>
                <div className='flex px-5 justify-center'>
                    <div className='content-center cursor-pointer' onClick={() => { console.log("search code here") }}>
                        <FontAwesomeIcon
                            icon={faSearch}
                            size='lg'
                        />
                    </div>
                    <input
                        className='py-2 px-4 flex-1 text-lg'
                        type='input'
                        placeholder='Search'
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                    />
                </div>
            </Widget>
            <div className='w-full flex flex-row gap-5'>
                {/* Driver List */}
                <div className='justify-center w-full lg:w-1/2 lg:min-w-[50%]'>
                    {drivers.length > 0 ? (
                        drivers.map((data, index) => {
                            const firstName = data.firstName || 'Unknown';
                            const lastName = data.lastName || 'Driver';
                            const fullName = (firstName + " " + lastName).toLowerCase();
                            if (fullName.includes(searchQuery.toLowerCase())) {
                                return (
                                    <DriverWidget
                                        key={index}
                                        driverData={data}
                                        onClick={() => onDriverClick(index)}
                                    />
                                );
                            }
                            return null;
                        })
                    ) : (
                        <p>Loading drivers...</p>
                    )}
                </div>
                {/* Driver Information */}
                <ResponsiveFullWidget onClose={() => setDriverIndex(-1)} visible={driverIndex >= 0}>
                    <div className=" mb-4 mt-2 mx-10 h-[100%] flex flex-col">
                        {driverIndex >= 0 &&
                            <>
                                <div className='grow overflow-auto pb-10'>
                                    <p className="text-3xl font-semibold mb-3">
                                        {drivers[driverIndex].firstName + " " + drivers[driverIndex].lastName}
                                    </p>
                                    {/* <p>{drivers[driverIndex].desc}</p> */}
                                </div>
                                <hr className='mb-4'></hr>
                                <div className='h-fit py-2'>
                                    <button onClick={() => {  }} className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                                        Select Driver
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </ResponsiveFullWidget>
            </div>
        </GenericPage>
    );
}