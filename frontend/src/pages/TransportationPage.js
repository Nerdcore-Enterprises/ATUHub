import React from 'react';
import HeaderWithBack from '../components/HeaderWithBack';
import GenericPage from '../components/genericPage';
import MapSelect from '../components/Transportation/MapSelect';

export default function TransportationPage() {
    return (
        <GenericPage>
            <HeaderWithBack>Pick a Location</HeaderWithBack>
            <MapSelect nextPage='driver' />
        </GenericPage>
    );
}
