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
import { useLocation } from "react-router-dom";

export default function DriveSubmit() {
    const [driveType, setDriveType] = useState(0);
    const [driveInstructions, setDriveInstructions] = useState("");
    const [payModalVisible, setPayModalVisible] = useState(false);

    const location = useLocation();
    const coords = location.state;

    // Temp values - These would be brought in I assume?
    const cost = 15;

    return (
        <>
            <GenericPage>
                <HeaderWithBack>Drive Information</HeaderWithBack>
                <Widget className="flex flex-col gap-2">
                    <div className="px-4 w-full flex flex-row">
                        <p className="font-semibold">Drive Location:</p>
                        <p className="text-right flex-grow">{coords.lat.toFixed(2)} {coords.lng.toFixed(2)}</p>
                    </div>
                </Widget>
                <div className="flex flex-row justify-between gap-20 px-20">
                    <WidgetBullet className="text-center" selected={driveType === 0} onClick={() => { setDriveType(0) }}>
                        Delivery
                    </WidgetBullet>
                    <WidgetBullet className="text-center" selected={driveType === 1} onClick={() => { setDriveType(1) }}>
                        Pick up/drop off
                    </WidgetBullet>
                </div>
                <Widget>
                    <div className="w-full flex flex-col gap-4 px-4 pt-2 pb-4">
                        <label className="font-semibold">Drive Instructions:</label>
                        <Textarea
                            id="driveInstructions"
                            name="driveInstructions"
                            value={driveInstructions}
                            onChange={(e) => { setDriveInstructions(e.value) }}
                            rows={4}
                            className="h-full border-2 border-gray-300 rounded-2xl p-2"
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
                    <p className="text-7xl font-semibold text-center mt-10">
                        ${cost}
                    </p>
                </InfoDisplay>
                <InfoActions>
                    <GreenButton className="w-full flex flex-row justify-center gap-10" onClick={() => { console.log("add payment here") }}>
                        Pay Here
                        {/* <FontAwesomeIcon icon={faArrowRight} className="-rotate-45 translate-y-[4px]"/> */}
                    </GreenButton>
                </InfoActions>
            </GenericModal>
        </>
    );
}