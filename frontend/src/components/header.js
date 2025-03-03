import React from 'react';
import Widget from './BaseWidgets/Widget';
import BackButton from './backButton';

export default function Header({ children, className }) {
    return (
        <Widget className='py-4'>
            <div className={"font-normal text-lg " + className}>
                {children}
            </div>
        </Widget>
    );
}
