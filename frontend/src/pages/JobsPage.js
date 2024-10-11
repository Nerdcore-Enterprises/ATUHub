import React from 'react';
import Widget from '../components/homeWidget';
import GenericPage from '../components/genericPage';

export default function JobsPage() {
    return (
        <>
            {new GenericPage(<>
                    {new Widget(<><h1 className="text-xl">jobs here</h1></>)}
                </>
            )}
        </>
    );
}