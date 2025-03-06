import { useState } from "react";
import Widget from "../../components/BaseWidgets/Widget";
import GreenButton from "../../components/Buttons/GreenButton";
import GenericPage from "../../components/genericPage";
import HeaderWithBack from "../../components/HeaderWithBack";
import Textarea from "../../components/Textarea";
import WidgetBullet from "../../components/Buttons/WidgetBullet";
import GenericModal from "../../components/GenericModal/GenericModal";
import InfoDisplay from "../../components/InfoDisplay";
import InfoActions from "../../components/InfoActions";

export default function DriveSubmit(){
    const [driveType, setDriveType] = useState(0);
    const [driveInstruction, setDriveInstruction] = useState("");
    const [payModalVisible, setPayModalVisible] = useState(false);

    // Temp values - These would be brought in I assume?
    const coords = {lat: 100, lng: 100}; 
    const cost = 15;

    return (
        <>
            <GenericPage>
                <HeaderWithBack>Drive Information</HeaderWithBack>
                <Widget className="flex flex-col gap-2">
                    <div className="px-4 w-full flex flex-row">
                        <p className="font-semibold">Drive Location:</p>
                        <p className="text-right flex-grow">{coords.lat} {coords.lng}</p>
                    </div>
                </Widget>
                <div className="flex flex-row justify-between gap-20 px-20">
                    <WidgetBullet className="text-center" selected={driveType === 0} onClick={() => {setDriveType(0)}}>
                        Delivery
                    </WidgetBullet>
                    <WidgetBullet className="text-center" selected={driveType === 1} onClick={() => {setDriveType(1)}}>
                        Pick up/drop off
                    </WidgetBullet>
                </div>
                <Widget>
                    <div className="px-4 w-full flex flex-col">
                        <label className="font-semibold">Drive Instructions:</label>
                        <Textarea
                            id="aboutMe"
                            name="aboutMe"
                            value={driveInstruction}
                            onChange={(e) => {setDriveInstruction(e.value)}}
                            rows={4}
                        />
                    </div>
                </Widget>
                <GreenButton className="w-full" onClick={() => setPayModalVisible(true)}>
                    Submit Drive
                </GreenButton>
            </GenericPage>
            <GenericModal
                visible={payModalVisible}
                onClose={() => setPayModalVisible(false)}
                className="max-w-96"
            >
                <InfoDisplay>
                    <p className="text-2xl text-center mt-10">
                        Cost: ${cost}
                    </p>
                </InfoDisplay>
                <InfoActions>
                    <GreenButton className="w-full flex flex-row justify-center gap-10" onClick={() => {console.log("add payment here")}}>
                        Pay Here
                        {/* <FontAwesomeIcon icon={faArrowRight} className="-rotate-45 translate-y-[4px]"/> */}
                    </GreenButton>
                </InfoActions>
            </GenericModal>
        </>
    );
}