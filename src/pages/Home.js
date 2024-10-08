import React from 'react';

// Stylesheet
import '../App.css';
import '../index.css';

// Images
import logo from '../assets/logos/ATUHub-Vertical-1024.png';

export default function HomePage() {

    return (
        <div className="background-fixed relative w-screen h-screen font-sans overflow-hidden">
            <div className="relative flex flex-col items-center h-full">
                <div className="rounded-lg w-screen bg-opacity-90">
                    <img src={logo} alt="ATUHub" className="mx-auto w-48 h-auto py-12" />

                    <div className="bg-zinc-300 min-h-screen max-h-full rounded-[2rem] p-4 space-y-4 shadow-[0_0_1vh_rgba(0,0,0,0.5)] flex-1 overflow-y-auto">
                        <div className="bg-white min-h-10 h-fit w-full rounded-[calc(2rem-0.5rem)] p-2 shadow-[0_0.25vh_0.5vh_rgba(0,0,0,0.2)]">
                            <h1 className="text-center text-md">Some random text we can put here</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}