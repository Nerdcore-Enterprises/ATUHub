import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Icons
import { faBars, faGear, faCloud, faUtensils, faCar, faBriefcase } from "@fortawesome/free-solid-svg-icons";

import '../styles/sidebar.css';
import NavWidget from "./navWidget";
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
            <div className={(isSidebarOpen ? 'opened' : 'closed') + " sidebar h-screen absolute w-4/5 bg-zinc-300 space-y-4 p-4 shadow-[0_0_5vh_rgba(0,0,0,0.7)]"}>
                <img src={logo} alt="ATUHub" className="m-auto w-11/12 max-w-screen-md invert cursor-pointer" onClick={() => handleNav('home/')}></img>

                <div className="bg-zinc-400 h-1 mt-auto rounded-full"></div>

                <button onClick={() => handleNav('weather')} className="rounded-full w-full text-left shadow-[0_0_1vh_rgba(0,0,0,0.5)]">
                    {new NavWidget(<><FontAwesomeIcon icon={faCloud} className="py-4 w-16"/><p>Weather</p></>, 'p-4 rounded-full')}
                </button>
                <button onClick={() => handleNav('dineoncampus')} className="rounded-full w-full text-left shadow-[0_0_1vh_rgba(0,0,0,0.5)]">
                    {new NavWidget(<><FontAwesomeIcon icon={faUtensils} className="py-4 w-16"/><p>DineOnCampus</p></>, 'p-4 rounded-full')}
                </button>
                <button onClick={() => handleNav('transporation')} className="rounded-full w-full text-left shadow-[0_0_1vh_rgba(0,0,0,0.5)]">
                    {new NavWidget(<><FontAwesomeIcon icon={faCar} className="py-4 w-16"/><p>Transportation</p></>, 'p-4 rounded-full')}
                </button>
                <button onClick={() => handleNav('jobs')} className="rounded-full w-full text-left shadow-[0_0_1vh_rgba(0,0,0,0.5)]">
                    {new NavWidget(<><FontAwesomeIcon icon={faBriefcase} className="py-4 w-16"/><p>Jobs</p></>, 'p-4 rounded-full')}
                </button>

                <div className="h-full">
                    <div className="space-y-6 w-full p-4 left-0 absolute bottom-10">
                        <div className="bg-gray-800 h-1 mt-auto"></div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-10">
                                {new NavWidget(<h1><FontAwesomeIcon icon={faGear} className="text-3xl"/>Username</h1>, 'h-fill p-4 rounded-full')}
                            </div>
                            <div className="col-span-2">
                                {new NavWidget(<FontAwesomeIcon icon={faGear} className="text-4xl"/>,'w-fit rounded-full')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 p-7">
                <button onClick={handleMenu}><FontAwesomeIcon icon={faBars} className="invert text-4xl" /></button>
            </div>
        </>
    );
}