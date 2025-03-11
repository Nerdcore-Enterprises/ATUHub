import React from 'react';

export default function ContentHeader({ children, className }) {
    return (
        <div className={"text-xl text-center font-semibold " + className}>
            {children}
        </div>
    );
}
