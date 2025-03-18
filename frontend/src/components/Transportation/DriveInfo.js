import GreenButton from "../Buttons/GreenButton";
import InfoActions from "../InfoActions";
import InfoDisplay from "../InfoDisplay";
import JustifyBetweenDiv from "../JustifyBetweenDiv";
import InfoUnorderedList from "../InfoUnorderedList";
import { useNavigate } from "react-router-dom";

export default function DriveInfo({ driverInfo, coords }) {
    const navigate = useNavigate();
    
    console.log(driverInfo)
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
                <JustifyBetweenDiv>
                    <p>Vehicle Make: </p>
                    <p>{driverInfo.vehicle_make}</p>
                </JustifyBetweenDiv>
                <JustifyBetweenDiv>
                    <p>Vehicle Model: </p>
                    <p>{driverInfo.vehicle_model}</p>
                </JustifyBetweenDiv>
                <JustifyBetweenDiv>
                    <p>Vehicle Color: </p>
                    <p>{driverInfo.vehicle_color}</p>
                </JustifyBetweenDiv>
                <br></br>
                {driverInfo.tags && 
                    <InfoUnorderedList
                        title="Tags"
                        data={driverInfo.tags}
                    />
                }
                {!driverInfo.tags &&
                    <div>This driver hasn't been given any tags</div>
                }
                <br></br>
                {driverInfo.status && 
                    <JustifyBetweenDiv>
                        <p>Driver Status: </p>
                        <p>{driverInfo.status}</p>
                    </JustifyBetweenDiv>
                }
                {!driverInfo.tags &&
                    <div>This driver's status is unavailable</div>
                }
            </InfoDisplay>
            <InfoActions>
                <GreenButton onClick={() => handleNav('/transportation/drive-submit', { state: { lng: coords.lng, lat: coords.lat } })} className='w-full'>
                    Select Driver
                </GreenButton>
            </InfoActions>
        </>
    );
}