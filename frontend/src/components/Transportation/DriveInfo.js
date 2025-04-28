import GreenButton from "../Buttons/GreenButton";
import InfoActions from "../InfoActions";
import InfoDisplay from "../InfoDisplay";
import InfoUnorderedList from "../InfoUnorderedList";
import { useNavigate } from "react-router-dom";
import HorizontalWidgetList from "../WidgetContainers/HorizontalWidgetList";
import VerticalWidgetList from "../WidgetContainers/VerticalWidgetList";

export default function DriveInfo({ driverInfo, coords }) {
    const navigate = useNavigate();
    
    const handleNav = (path, props) => {
        navigate(path, props);
    };

    return (
        <>
            <InfoDisplay>
                <p className="text-3xl font-semibold mb-3">
                    {driverInfo.firstName + " " + driverInfo.lastName}
                </p>
                <br></br>
                <hr></hr>
                <br></br>
                <p className="text-3xl font-semibold mb-3">Vehicle Information</p>
                <HorizontalWidgetList className="text-xl text-center">
                    <VerticalWidgetList>
                        <p className="flex justify-center w-20 mx-auto font-semibold border-b-2 border-b-current">Make</p>
                        <p>{driverInfo.vehicle_make}</p>
                    </VerticalWidgetList>
                    <VerticalWidgetList>
                        <p className="flex justify-center w-20 mx-auto font-semibold border-b-2 border-b-current">Model</p>
                        <p>{driverInfo.vehicle_model}</p>
                    </VerticalWidgetList>
                    <VerticalWidgetList>
                        <p className="flex justify-center w-20 mx-auto font-semibold border-b-2 border-b-current">Color</p>
                        <p>{driverInfo.vehicle_color}</p>
                    </VerticalWidgetList>
                </HorizontalWidgetList>

                <br></br>
                {driverInfo.tags && 
                    <InfoUnorderedList
                        className="text-xl"
                        title="Tags"
                        data={JSON.parse(driverInfo.tags)}
                    />
                }
                {!driverInfo.tags &&
                    <div>This driver hasn't been given any tags</div>
                }
            </InfoDisplay>
            <InfoActions
                extraInfo={<p className="text-xl font-bold">Driver Status: {driverInfo.status}</p>}
            >
                <GreenButton onClick={() => handleNav('/transportation/drive-submit', { state: { lng: coords.lng, lat: coords.lat } })} className='w-full'>
                    Select Driver
                </GreenButton>
            </InfoActions>
        </>
    );
}