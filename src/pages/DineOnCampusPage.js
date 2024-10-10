import React from 'react';
import Widget from '../components/widget';
import GenericPage from '../components/generic_page';

export default function DineOnCampusPage() {
    return (
        <>
            {new GenericPage(<>
                    {new Widget(<><h1 className="text-xl">dine on campus here</h1></>)}
                </>
            )}
        </>
    );
}