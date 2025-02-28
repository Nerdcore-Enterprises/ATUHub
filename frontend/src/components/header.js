import React from 'react';
import Widget from './Widget';
import BackButton from '../components/backButton';

export default function Header({ children }) {
    return (
        <div className="flex items-center space-x-4">
            <BackButton />
            <Widget className='py-4'>
                <h1 className="font-normal text-lg">
                    {children}
                </h1>
            </Widget>
        </div>
    );
}
