import React from 'react';
import Widget from '../components/widget';
import GenericPage from '../components/generic_page';

export default function HomePage() {
    return (
        <>
            {new GenericPage(<>
                    {new Widget(<><h1 className="text-xl">hojme here</h1></>)}
                    {new Widget(<><h1 className="text-xs">some small text here</h1></>)}
                </>
            )}
        </>
    );
}