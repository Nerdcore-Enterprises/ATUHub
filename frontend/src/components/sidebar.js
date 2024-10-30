import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

import { faBars, faGear, faCloud, faUtensils, faCar, faBriefcase, faUser } from "@fortawesome/free-solid-svg-icons";

import '../styles/sidebar.css';
import NavWidget from "./navWidget";
import logo from '.././assets/logos/ATUHub_Horizontal.png'

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const username = localStorage.getItem('username');

    const handleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNav = (path) => {
        setIsSidebarOpen(false);
        navigate(path);
    };

    return (
        <>
            <div className={(isSidebarOpen ? 'opened' : 'closed') + " sidebar h-screen absolute max-w-80 bg-zinc-300 space-y-4 p-4 shadow-[0_0_5vh_rgba(0,0,0,0.7)]"}>
                <img src={logo} alt="ATUHub" className="m-auto w-64 max-w-screen-md invert cursor-pointer" onClick={() => handleNav('home/')}></img>

                <div className="bg-zinc-600 h-1 mt-auto rounded-full"></div>

                <button onClick={() => handleNav('weather')} className="w-full text-left">
                    {new NavWidget(<><FontAwesomeIcon icon={faCloud} className="py-4 w-16"/><p>Weather</p></>, 'p-4 rounded-full shadow-[0_0_1vh_rgba(0,0,0,0.5)]')}
                </button>
                <button onClick={() => handleNav('dineoncampus')} className="w-full text-left">
                    {new NavWidget(<><FontAwesomeIcon icon={faUtensils} className="py-4 w-16"/><p>DineOnCampus</p></>, 'p-4 rounded-full shadow-[0_0_1vh_rgba(0,0,0,0.5)]')}
                </button>
                <button onClick={() => handleNav('transportation')} className="w-full text-left">
                    {new NavWidget(<><FontAwesomeIcon icon={faCar} className="py-4 w-16"/><p>Transportation</p></>, 'p-4 rounded-full shadow-[0_0_1vh_rgba(0,0,0,0.5)]')}
                </button>
                <button onClick={() => handleNav('jobs')} className="w-full text-left">
                    {new NavWidget(<><FontAwesomeIcon icon={faBriefcase} className="py-4 w-16"/><p>Jobs</p></>, 'p-4 rounded-full shadow-[0_0_1vh_rgba(0,0,0,0.5)]')}
                </button>

                <div>
                    <div className="space-y-4 w-full p-4 left-0 absolute bottom-0">
                        <div className="bg-zinc-600 h-1 mt-auto rounded-full"></div>
                        <div className="flex space-x-4">
                            <div className="flex-grow">
                                {new NavWidget(
                                    <button onClick={() => handleNav('account')} className="flex flex-row items-center w-full text-left">
                                        <FontAwesomeIcon icon={faUser} className="py-4 w-16" />
                                        <p>{username || 'Profile'}</p>
                                    </button>,
                                    'p-4 rounded-full shadow-[0_0_1vh_rgba(0,0,0,0.5)]'
                                )}
                            </div>
                            <div className="w-fit">
                                {new NavWidget(
                                    <>
                                        <FontAwesomeIcon icon={faGear} className="py-4 w-14"/>
                                    </>,
                                    'p-2 rounded-full shadow-[0_0_1vh_rgba(0,0,0,0.5)]'
                                )}
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