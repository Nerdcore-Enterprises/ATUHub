export default function JobApplyInfo({jobInfo}) {
    return (
        <>
            <h1 className='text-center'>Contact to Apply</h1>
            <br/>
            <div className='px-4 py-2 flex flex-col w-full justify-evenly gap-10'>
                <div className="px-4 text-xl">
                    <p className='text-xl font-bold'>Requirements:</p>
                    <br></br>
                    <p>{jobInfo.Requirements}</p>
                </div>
                <hr></hr>
                <div className="px-4 flex flex-row justify-center gap-10 text-xl">
                    <p className='text-xl font-bold'>Contact:</p>                     
                    <a href={"mailto:" + jobInfo.ContactInfo} className='underline text-blue-500 text-2xl translate-y-[-5px]' >{jobInfo.ContactInfo}</a>
                </div>
            </div>
        </>
    );
};