import GreenButton from "../Buttons/GreenButton";
import InfoActions from "../InfoActions";
import InfoDisplay from "../InfoDisplay";
import { useNavigate } from "react-router-dom";

export default function DriveInfo({driverInfo, coords}) {
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
            </InfoDisplay>
            <InfoActions>
                <GreenButton onClick={() => handleNav('/transportation/drive-submit', { state: { lng: coords.lng, lat: coords.lat } })} className='w-full'>
                    
                    Select Driver
                </GreenButton>
            </InfoActions>
        </>
    );
}