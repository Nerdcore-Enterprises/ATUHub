import React from 'react';

// Stylesheet
import '../App.css';
import '../index.css';

// Images
import logo from '../assets/logos/ATUHub-Vertical-1024.png';

function AboutPage() {
    return (
        <div className="background-fixed relative w-screen h-screen font-sans">
            <div className="relative flex flex-col items-center justify-center h-full">
                <div className="px-8 rounded-lg md:w-auto w-full bg-opacity-90">
                    <img src={logo} alt="ATUHub" className="mx-auto w-48 h-auto" />

                    <p className="text-center text-white">
                        Success, welcome to ATUHub
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
