import Widget from "../../components/BaseWidgets/Widget";

export default function DriveRequestWidget({requestData, onClick}){

    return(
        <Widget>
            <div className="my-4 mx-6">
                <p className="text-3xl font-semibold mb-3">
                    {requestData.name}
                </p>
                <br></br>
                    <div className="flex flex-row">
                        <button onClick={() => onClick()} className="bg-[var(--ATUGreen)] ml-auto w-1/2 rounded-[1.5rem] text-white font-semibold py-3 px-6 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                            View
                        </button>
                    </div>
            </div>
        </Widget>
    );
}