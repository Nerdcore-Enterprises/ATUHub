export default function DriverApplyInfo() {
    return (
        <div className='flex flex-col items-center justify-center min-w-96'>
            <h1 className='text-center text-3xl font-semibold'>How to Apply</h1>
            <br />
            <div className='flex flex-col px-4 py-2 justify-evenly gap-4'>
                <p>Simply send us an email with the following information:</p>
                <ul className="list-disc list-inside">
                    <li className="font-semibold">Your Name (<span className="font-normal text-sm italic">Dylan Dover</span>)</li>
                    <li className="font-semibold">Your Tech Email (<span className="font-normal text-sm italic">ddover1@atu.edu</span>)</li>
                    <li className="font-semibold">Your Car (<span className="font-normal text-sm italic">Make, Model, Color, and Plate</span>)</li>
                    <li className="font-semibold">Your CashApp™ Cashtag (<span className="font-normal text-sm italic">$dylndovr</span>)</li>
                </ul>
                <p>Email: <span className="font-black font-mono">atuhub@dylandover.dev</span></p>
            </div>
        </div>
    );
};