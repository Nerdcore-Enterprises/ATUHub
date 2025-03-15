import React, { useState } from 'react';
import GenericModal from '../components/GenericModal/GenericModal';
import HeaderWithBack from '../components/HeaderWithBack';
import GenericPage from '../components/genericPage';
import Menu from '../components/Transportation/Menu';
import DriverApplyInfo from '../components/Transportation/DriverApplyInfo';

export default function TransportationPage() {
    const [infoVisible, setInfoVisible] = useState(false);

    return (
        <>
            <GenericPage>
                <HeaderWithBack>Transportation</HeaderWithBack>
                <Menu setInfoVisible={setInfoVisible} />
            </GenericPage>
            <GenericModal
                visible={infoVisible}
                onClose={() => setInfoVisible(false)}
                fitContent={true}
            >
                <DriverApplyInfo />
            </GenericModal>
        </>
    );
}
