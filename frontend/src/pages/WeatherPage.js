import React from 'react';
import Widget from '../components/widget';
import GenericPage from '../components/generic_page';

export default function WeatherPage() {
    return (
        <>
            {new GenericPage(<>
                    {new Widget(<><h1 className="text-xl">weather here</h1></>)}
                </>
            )}
        </>
    );
}