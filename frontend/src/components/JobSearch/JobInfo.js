import GreenButton from "../Buttons/GreenButton";
import InfoActions from "../InfoActions";
import InfoDisplay from "../InfoDisplay";

export default function JobInfo({jobInfo, setApplyVisible}){
    return (
        <>
            <InfoDisplay>
                <p className="text-3xl font-semibold mb-3">
                    {jobInfo.Name}
                </p>
                <p className="min-h-60">{jobInfo.Description}</p>
            </InfoDisplay>
            <InfoActions>
                {jobInfo.applyExternally &&
                    <a href={jobInfo.ContactInfo} className="w-full">
                        <GreenButton onClick={() => {setApplyVisible(true)}} className='w-full'>
                            Apply Externally
                        </GreenButton>
                    </a>
                }
                {!jobInfo.applyExternally &&
                    <GreenButton onClick={() => {setApplyVisible(true)}} className='w-full'>
                        Apply Information
                    </GreenButton>
                }
            </InfoActions>
        </>
    );   
}