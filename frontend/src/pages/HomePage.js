import React from 'react';
import Widget from '../components/homeWidget';
import GenericPage from '../components/genericPage';

export default function HomePage() {
    return (
        <>
            {new GenericPage(
                <>
                    {new Widget(<p className="text-sm rounded-full w-full h-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] p-4">some small text here</p>)}
                </>
            )}
        </>
    );
}
