import React from 'react';
import Widget from '../components/homeWidget';
import GenericPage from '../components/genericPage';

export default function DineOnCampusPage() {
    return (
        <>
            {new GenericPage(
                <>
                    {new Widget(<p className="text-xl rounded-full w-full h-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] p-4">DineOnCampus</p>)}
                </>
            )}
        </>
    );
}
