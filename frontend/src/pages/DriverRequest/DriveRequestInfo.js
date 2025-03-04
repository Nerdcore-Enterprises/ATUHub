import Widget from "../../components/BaseWidgets/Widget";

export default function DriveRequestInfo({requestInfo}){
    return (
        <>
            <div className='grow overflow-visible pb-10'>
                <Widget>
                    <p className="text-3xl font-semibold py-2 px-4">
                        {requestInfo.name}
                    </p>
                </Widget>
                <br></br>
                <Widget>
                    <div className="px-4 flex flex-row justify-between">
                        <p>Drive Location: </p>
                        <p>{requestInfo.location}</p>
                    </div>
                </Widget>
                <Widget>
                    <div className="px-4 flex flex-row justify-between">
                        <p>Drive Type: </p>
                        <p>{requestInfo.type}</p>
                    </div>
                </Widget>
                <Widget>
                    <div className="px-4">
                        <p>Drive Type: </p>
                        <p className="min-h-60">{requestInfo.instructions}</p>
                    </div>
                </Widget>
                <Widget>
                    <div className="px-4 flex flex-row justify-between">
                        <p>Drive Pay: </p>
                        <p>${requestInfo.pay}</p>
                    </div>
                </Widget>
            </div>
            <hr className='mb-4'></hr>
            <div className='h-fit py-2 flex flex-row gap-4'>
                <button className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                    Accept Drive
                </button>
                <button className="bg-[var(--ATUGreen)] ml-auto rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] w-full">
                    Decline Drive
                </button>
            </div>
        </>
    );
}