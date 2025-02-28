import React from 'react';
import Header from '../components/header';
import GenericPage from '../components/genericPage';
import MapSelect from '../components/Transportation/MapSelect';

export default function TransportationPage() {
    return (
        <GenericPage>
            <Header>Pick a Location</Header>
            <MapSelect nextPage='driver' />
        </GenericPage>
    );
}
