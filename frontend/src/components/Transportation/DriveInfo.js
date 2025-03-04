import GreenButton from "../Buttons/GreenButton";

export default function DriveInfo({driverInfo}) {
    return (
        <>
            <div className='grow overflow-auto pb-10'>
                <p className="text-3xl font-semibold mb-3">
                    {driverInfo.firstName + " " + driverInfo.lastName}
                </p>
                {/* <p>{drivers[driverIndex].desc}</p> */}
            </div>
            <hr className='mb-4'></hr>
            <div className='h-fit py-2'>
                <GreenButton onClick={() => {}} className='w-full'>
                    Select Driver
                </GreenButton>
            </div>
        </>
    );
}