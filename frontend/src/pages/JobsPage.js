import React from 'react';
import Widget from '../components/widget';
import GenericPage from '../components/generic_page';

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