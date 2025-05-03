import Widget from "../../components/BaseWidgets/Widget";
import GreenButton from "../../components/Buttons/GreenButton";

export default function DriveRequestWidget({requestData, onClick}){

    return(
        <Widget>
            <div className="my-4 mx-6">
                <p className="text-3xl font-semibold mb-3">
                    {requestData.name}
                </p>
                <br></br>
                    <div className="flex flex-row">
                        <GreenButton onClick={() => onClick()} className="w-1/2 ml-auto">
                            View
                        </GreenButton>
                    </div>
            </div>
        </Widget>
    );
}