import Widget from "../BaseWidgets/Widget";
import GreenButton from "../Buttons/GreenButton";
import TagDisplay from "../TagDisplay";

export default function DriverWidget({ driverData, onClick }) {

    return (
        <Widget>
            <div className="my-4 mx-6">
                <p className="text-3xl font-semibold mb-3">
                    {driverData.firstName + " " + driverData.lastName}
                </p>
                {driverData.tags &&
                    <TagDisplay
                        tags={JSON.parse(driverData.tags)}
                    />
                }
                <div className="flex flex-row mt-4">
                    <GreenButton onClick={() => onClick()} className="w-1/2 ml-auto">
                        View
                    </GreenButton>
                </div>
            </div>
        </Widget>
    );
}