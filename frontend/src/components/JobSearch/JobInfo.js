import GreenButton from "../Buttons/GreenButton";
import InfoActions from "../InfoActions";
import InfoDisplay from "../InfoDisplay";

export default function JobInfo({jobInfo, setApplyVisible}){
    const responsibilities = JSON.parse(jobInfo.Responsibilities);
    const requirements = JSON.parse(jobInfo.Requirements);

    return (
        <>
            <InfoDisplay>
                <p className="text-3xl font-semibold mb-3">{jobInfo.Name}</p>
                <p>{jobInfo.Description}</p>
                <br></br>
                <p className="text-3xl font-semibold mb-3">Responsibilities</p>
                <ul>
                    {
                        responsibilities.map((data, index) => (
                            <li key={index}>&bull; {data}</li>
                        ))
                    }
                </ul>
                <br></br>
                <p className="text-3xl font-semibold mb-3">Requirements</p>
                <ul>
                    {
                        requirements.map((data, index) => (
                            <li key={index}>&bull; {data}</li>
                        ))
                    }
                </ul>
            </InfoDisplay>
            <InfoActions
                extraInfo={<p className="text-xl font-bold">${jobInfo.Salary}{jobInfo.SalaryType === 'Hourly' ? ' per hour': ''}</p>}
            >
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


