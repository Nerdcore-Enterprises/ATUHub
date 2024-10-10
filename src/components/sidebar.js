import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Icons
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import './sidebar.css';
import Widget from "./widget";
import logo from '.././assets/logos/ATUHub_Horizontal.png'

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNav = (path) => {
        setIsSidebarOpen(false);
        navigate(path);
    };

    return (
        <>
            <div className={(
                isSidebarOpen ? 'opened' : 'closed') 
                +" sidebar h-screen absolute w-4/5 bg-zinc-300 space-y-4 p-4"
            }>
                <img src={logo} alt="ATU HUB logo" className="m-auto w-11/12 max-w-screen-md invert cursor-pointer" onClick={() => handleNav('home/')}></img>
                <div className="bg-gray-800 h-1"></div>

                <button onClick={() => handleNav('weather/')} className="w-full text-left">
                    {new Widget(<h1><FontAwesomeIcon icon={faGear} className="text-3xl"/>      Weather</h1>, 'p-4 rounded-full')}
                </button>
                <button onClick={() => handleNav('jobs/')} className="w-full text-left">
                    {new Widget(<h1><FontAwesomeIcon icon={faGear} className="text-3xl"/>      Jobs</h1>, 'p-4 rounded-full')}
                </button>
                <button onClick={() => handleNav('transportation/')} className="w-full text-left">
                    {new Widget(<h1><FontAwesomeIcon icon={faGear} className="text-3xl"/>      Transportation</h1>, 'p-4 rounded-full')}
                </button>
                <button onClick={() => handleNav('dineoncampus/')} className="w-full text-left">
                    {new Widget(<h1><FontAwesomeIcon icon={faGear} className="text-3xl"/>      Dine on Campus</h1>, 'p-4 rounded-full')}
                </button>                

                <div className="h-full">
                    <div className="space-y-6 w-full p-4 left-0 absolute bottom-10">
                        <div className="bg-gray-800 h-1 mt-auto"></div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-10">
                                {new Widget(<h1><FontAwesomeIcon icon={faGear} className="text-3xl"/>      Username</h1>, 'h-fill p-4 rounded-full')}
                            </div>
                            <div className="col-span-2">
                                {new Widget(<FontAwesomeIcon icon={faGear} className="text-4xl"/>,'w-fit p-4 ml-auto rounded-full')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute right-10 top-10">
                <button onClick={handleMenu}><FontAwesomeIcon icon={faBars} className="invert text-6xl" /></button>
            </div>
        </>
    );
}