import Widget from "../BaseWidgets/Widget";
import GreenButton from "../Buttons/GreenButton";

export default function DriverWidget({ driverData, onClick }) {

    return (
        <Widget>
            <div className="my-4 mx-6">
                <p className="text-3xl font-semibold mb-3">
                    {driverData.firstName + " " + driverData.lastName}
                </p>
                <div className="flex space-x-4 rounded-b-[1rem] overflow-x-auto weather-scroll">
                    {
                        driverData.tags && // TODO: Tags should be passed in through driverData
                        <>
                            {driverData.tags.map((tag, index) => (
                                <div key={index} className="bg-[#333333] text-white rounded-[2rem] flex flex-col items-center2 pr-4 pl-4 pt-2 pb-2">
                                    <p>{tag}</p>
                                </div>
                            ))}
                        </>
                    }
                </div>
                <div className="flex flex-row">
                    <GreenButton onClick={() => onClick()} className="w-1/2 ml-auto">
                        View
                    </GreenButton>
                </div>
            </div>
        </Widget>
    );
}