import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useEffect } from "react";

import { faBars, faGear, faCloud, faUtensils, faCar, faBriefcase, faUser, faG } from "@fortawesome/free-solid-svg-icons";

import './Sidebar.css';
import NavWidget from "./SidebarNavButton";
import logo from '../.././assets/logos/ATUHub_Horizontal.png'
import NavButton from "../Buttons/NavButton";
import BackgroundFade from "../BackgroundFade/BackgroundFade";
import ContentDiv from "../WidgetContainers/ContentDiv";
import InvertableImage from "../InvertableImage";
import SidebarNavButton from "./SidebarNavButton";
import IconButton from "../Buttons/IconButton";
import WidgetFullHeight from "../BaseWidgets/WidgetFullHeight";
import WidgetFixedHeight from "../BaseWidgets/WidgetFixedHeight";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const username = localStorage.getItem('username');

    const handleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleBackgroundClick = (event) => {
        if (isSidebarOpen){
            setIsSidebarOpen(false);
        }
        else {
            event.stopPropagation();
        }
    }

    return (
        <>
            <BackgroundFade visible={isSidebarOpen} onClose={handleBackgroundClick}/>
            <ContentDiv className={(isSidebarOpen ? 'opened' : 'closed') + " sidebar h-screen fixed max-w-80 bg-zinc-300 space-y-4 p-4 shadow-[0_0_5vh_rgba(0,0,0,0.7)] "}>
                <NavButton to={'home/'} onClick={() => setIsSidebarOpen(false)}>
                    <InvertableImage reverse={true} src={logo} alt="ATUHub" className="m-auto w-64 max-w-screen-md cursor-pointer"></InvertableImage>
                </NavButton>

                <div className="bg-zinc-600 h-1 mt-auto rounded-full"></div>
                <SidebarNavButton
                    to='weather'
                    name='Weather'
                    icon={faCloud}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <SidebarNavButton
                    to='dineoncampus'
                    name='DineOnCampus'
                    icon={faUtensils}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <SidebarNavButton
                    to='transportation'
                    name='Transportation'
                    icon={faCar}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <SidebarNavButton
                    to='jobs'
                    name='Jobs'
                    icon={faBriefcase}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <div>
                    <div className="space-y-4 w-full p-4 left-0 absolute bottom-0">
                        <div className="bg-zinc-600 h-1 mt-auto rounded-full"></div>
                        <div className="flex space-x-4">
                            <div className="flex-grow">
                                <SidebarNavButton
                                    to='account'
                                    icon={faUser}
                                    name={username || 'Profile'}
                                    setIsSidebarOpen={setIsSidebarOpen}
                                />
                            </div>
                            <div className="">
                                <NavButton>
                                    <WidgetFixedHeight height={50} className="aspect-square justify-center">
                                        <FontAwesomeIcon icon={faGear} className="inline-block text-center align-center"/>
                                    </WidgetFixedHeight>
                                </NavButton>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentDiv>
            <div className="absolute top-0 right-0 p-7">
                <button onClick={handleMenu}><FontAwesomeIcon icon={faBars} className="invert text-4xl" /></button>
            </div>
        </>
    );
}