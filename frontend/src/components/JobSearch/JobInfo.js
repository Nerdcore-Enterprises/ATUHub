import StickyWidget from "../BaseWidgets/StickyWidget";
import GreenButton from "../Buttons/GreenButton";

export default function JobInfo({jobInfo, setApplyVisible}){
    return (
        <>
            <div className='grow overflow-auto pb-10'>
                <p className="text-3xl font-semibold mb-3">
                    {jobInfo.Name}
                </p>
                <p>{jobInfo.Description}</p>
            </div>
            <StickyWidget className='bottom-5 shadow-none'>
            <hr className='mb-4'></hr>

                <div className='h-fit py-2'>
                    {jobInfo.applyExternally &&
                        <a href={jobInfo.ContactInfo}>
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
                </div>
            </StickyWidget>
        </>
    );   
}