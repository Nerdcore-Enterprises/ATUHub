export default function JobApplyInfo({jobInfo}) {
    return (
        <>
            <h1 className='text-center'>Contact to Apply</h1>
            <br/>
            <div className='px-4 py-2 flex flex-row w-full justify-evenly gap-10'>
                <div>
                    <h1 className='text-center'>Contact:</h1> 
                    <br/>                          
                    <a href={"mailto:" + jobInfo.ContactInfo} className='underline text-blue-500 text-2xl' >{jobInfo.ContactInfo}</a>
                </div>
                <div>
                    <h1 className='text-center'>Requirements:</h1>
                    <br/>
                    {jobInfo.Requirements}
                </div>
            </div>
        </>
    );
};