import ResponsiveFullWidget from "../components/JobSearch/ResponsiveFullWidget";
import DriverWidget from "../components/Transportation/DriverWidget";
import GenericErrorPage from "../components/GenericErrorPage/GenericErrorPage";
import GenericLoadingPage from "../components/GenericErrorPage/GenericLoadingPage";
import { useState, useEffect } from "react";
import GenericPage from "../components/genericPage";
import Header from '../components/Header';
import SearchBar from "../components/SearchBar";
import VerticalWidgetList from "../components/WidgetContainers/VerticalWidgetList";
import DriveInfo from "../components/Transportation/DriveInfo";

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
        if (window.innerWidth >= 1024){ // This sets a default driver selection on desktop view
            setDriverIndex(0);
        }
    }, [])

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
            <SearchBar
                query={searchQuery}
                setQuery={setSearchQuery}
            />
            {drivers.length > 0 && 
            <div className='w-full flex flex-row gap-5'>
                {/* Driver List */}
                <VerticalWidgetList className="lg:w-1/2 lg:min-w-[50%]">
                {
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
                    }
                </VerticalWidgetList>
                {/* Driver Information */}
                <ResponsiveFullWidget onClose={() => setDriverIndex(-1)} visible={driverIndex >= 0}>
                    {driverIndex >= 0 &&
                        <>
                            <DriveInfo
                                driverInfo={drivers[driverIndex]}
                            />
                        </>
                    }
                </ResponsiveFullWidget>
            </div>
            }
        </GenericPage>
    );
}