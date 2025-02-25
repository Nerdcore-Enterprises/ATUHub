import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, /*faFilter*/ } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GenericPage from "../components/genericPage";
import Header from "../components/header";
import Widget from "../components/homeWidget"; import ResponsiveFullWidget from "../components/JobSearch/ResponsiveFullWidget";
import DriverWidget from "../components/Transportation/DriverWidget";

export default function PickDriverPage() {
    const [driverIndex, setDriverIndex] = useState(-1);
    const [drivers, setDrivers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [applyVisible, setApplyVisible] = useState(false);

    const location = useLocation();
    const coords = location.state;

    const fetchDriverData = async () => {
        try {
            const response = await fetch('/api/drivers-names');
            const data = await response.json();

            console.log(JSON.stringify(data, null, 2));
            setDrivers(data.drivers || []);
        } catch {
            console.error("Failed to fetch drivers");
            setDrivers([]);
        }
    };

    useEffect(() => {
        fetchDriverData();
    }, [])

    const onDriverClick = (newIndex) => {
        setDriverIndex(newIndex);
    }

    return (
        <GenericPage>
            <Header title="Pick a Driver" />
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
                                    <button onClick={() => { setApplyVisible(true) }} className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                                        Select Driver
                                    </button>
                                </div>
                                {/* Apply info modal */}
                                {/* <GenericModal
                                        visible={applyVisible}
                                        onClose={() => { setApplyVisible(false) }}
                                        fitContent={true}
                                    >
                                        <h1 className='text-center'>Contact to Apply</h1>
                                        <br />
                                        <div className='px-4 py-2 flex flex-row w-full justify-evenly gap-10'>
                                            <div>
                                                <h1 className='text-center'>Contact:</h1>
                                                <br />
                                                <a href={"mailto:" + testJobData[jobIndex].contact} className='underline text-blue-500 text-2xl' >{testJobData[jobIndex].contact}</a>
                                            </div>
                                            <div>
                                                <h1 className='text-center'>Requirements:</h1>
                                                <br />
                                                <ul>
                                                    {testJobData[jobIndex].requirements.map((requirement, key) => {
                                                        return (
                                                            <li key={key}>{requirement}</li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </GenericModal> */}
                            </>
                        }
                    </div>
                </ResponsiveFullWidget>
            </div>
        </GenericPage>
    );
}