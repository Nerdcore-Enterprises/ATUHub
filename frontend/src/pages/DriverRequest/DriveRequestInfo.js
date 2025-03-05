import GreenButton from "../../components/Buttons/GreenButton";
import InfoActions from "../../components/InfoActions";
import InfoDisplay from "../../components/InfoDisplay";

export default function DriveRequestInfo({requestInfo}){
    return (
        <>
            {/* <div className='grow overflow-visible pb-10'> */}
            <InfoDisplay>
                <p className="text-3xl font-semibold">
                    {requestInfo.name}
                </p>
                <br></br>
                <hr></hr>
                <div className="flex flex-row justify-between text-xl">
                    <p>Drive Location: </p>
                    <p>{requestInfo.location}</p>
                </div>
                <div className="flex flex-row justify-between text-xl">
                    <p>Drive Type: </p>
                    <p>{requestInfo.type}</p>
                </div>
                <br></br>
                <hr></hr>
                <div className="text-xl">
                    <p>Instructions: </p>
                    <p className="min-h-60">{requestInfo.instructions}</p>
                </div>
            </InfoDisplay>
            {/* </div> */}
            <InfoActions
                extraInfo={<p className="text-xl font-bold">Drive Pay: ${requestInfo.pay}</p>}
            >
                <GreenButton className="w-full">
                    Accept Drive
                </GreenButton>
                <GreenButton className="w-full">
                    Decline Drive
                </GreenButton>
            </InfoActions>
        </>
    );
}