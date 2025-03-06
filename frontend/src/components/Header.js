import React from 'react';
import Widget from './BaseWidgets/Widget';

export default function Header({ children, className }) {
    return (
        <Widget className='py-4 px-5'>
            <div className={"font-normal text-lg " + className}>
                {children}
            </div>
        </Widget>
    );
}
