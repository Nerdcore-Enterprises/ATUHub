import React from 'react';
import Header from '../components/header';
import GenericPage from '../components/genericPage';
import MapSelect from '../components/MapSelect/MapSelect';
import { useNavigate } from 'react-router-dom';

export default function TransportationPage() {
    const navigate = useNavigate();
    return (
        <GenericPage>
            <Header title="Transportation" />
            <MapSelect onClick={() => {navigate('driver')}}/>
        </GenericPage>
    );
}
