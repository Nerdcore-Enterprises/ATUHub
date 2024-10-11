import React from 'react';
import Widget from '../components/homeWidget';
import GenericPage from '../components/genericPage';

export default function TransportationPage() {
    return (
        <>
            {new GenericPage(
                <>
                    {new Widget(<p className="text-xl">Transportation</p>)}
                </>
            )}
        </>
    );
}