import GreenButton from "../Buttons/GreenButton";
import InfoActions from "../InfoActions";
import InfoDisplay from "../InfoDisplay";

export default function DriveInfo({driverInfo}) {
    return (
        <>
            <InfoDisplay>
                <p className="text-3xl font-semibold mb-3">
                    {driverInfo.firstName + " " + driverInfo.lastName}
                </p>
            </InfoDisplay>
            <InfoActions>
                <GreenButton onClick={() => {}} className='w-full'>
                    Select Driver
                </GreenButton>
            </InfoActions>
        </>
    );
}