import React from 'react';
import BackButton from '../components/backButton';

export default function Header({ title }) {
    return (
        <div className="flex items-center space-x-4">
            <BackButton />
            <h1 className="bg-white font-normal text-xl rounded-full px-6 py-4 w-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                {title}
            </h1>
        </div>
    );
}
