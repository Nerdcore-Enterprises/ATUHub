import React from 'react';
import BackButton from './backButton';
import Header from './Header';

export default function HeaderWithBack({ children }) {
    return (
        <div className="flex items-center space-x-4">
            <BackButton />
            <Header>
                {children}
            </Header>
        </div>
    );
}
