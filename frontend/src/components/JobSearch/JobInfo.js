import GreenButton from "../Buttons/GreenButton";
import InfoActions from "../InfoActions";
import InfoDisplay from "../InfoDisplay";
import InfoUnorderedList from "../InfoUnorderedList";

export default function JobInfo({ jobInfo, setApplyVisible }) {
    const responsibilities = JSON.parse(jobInfo.Responsibilities);
    const requirements = JSON.parse(jobInfo.Requirements);

    return (
        <>
            <InfoDisplay>
                <p className="text-3xl font-semibold mb-3">{jobInfo.Name}</p>
                <p>{jobInfo.Description}</p>
                <br></br>
                <InfoUnorderedList
                    title="Responsibilities"
                    data={responsibilities}
                />
                <br></br>
                <InfoUnorderedList
                    title="Requirements"
                    data={requirements}
                />
            </InfoDisplay>
            <InfoActions
                extraInfo={<p className="text-xl font-bold">${jobInfo.Salary}{jobInfo.SalaryType === 'Hourly' ? ' per hour' : ''}</p>}
            >
                {jobInfo.applyExternally &&
                    <a href={jobInfo.ContactInfo} className="w-full">
                        <GreenButton onClick={() => { setApplyVisible(true) }} className='w-full'>
                            Apply Externally
                        </GreenButton>
                    </a>
                }
                {!jobInfo.applyExternally &&
                    <GreenButton onClick={() => { setApplyVisible(true) }} className='w-full'>
                        Apply Information
                    </GreenButton>
                }
            </InfoActions>
        </>
    );
}


