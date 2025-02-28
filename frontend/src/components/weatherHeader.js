import React from 'react';
import BackButton from './backButton';

export default function WeatherHeader({ children }) {
    return (
        <div className="flex items-center space-x-4">
            <BackButton />
            <h1 className="flex flex-row items-center justify-between bg-white font-normal text-lg rounded-[2rem] px-6 py-4 w-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
                <div className="flex flex-grow items-center justify-between">{children}</div>
            </h1>
        </div>
    );
}
