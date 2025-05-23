import GreenButton from "../../components/Buttons/GreenButton";
import InfoActions from "../../components/InfoActions";
import InfoDisplay from "../../components/InfoDisplay";
import JustifyBetweenDiv from "../../components/JustifyBetweenDiv";

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
                <JustifyBetweenDiv>
                    <p>Drive Location: </p>
                    <p>{requestInfo.location}</p>
                </JustifyBetweenDiv>
                <JustifyBetweenDiv>
                    <p>Drive Type: </p>
                    <p>{requestInfo.type}</p>
                </JustifyBetweenDiv>
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