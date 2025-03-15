import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear, faCloud, faUtensils, faCar, faBriefcase, faUser, faUserCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';

import logo from '../.././assets/logos/ATUHub_Horizontal.png'
import NavButton from "../Buttons/NavButton";
import InvertableImage from "../InvertableImage";
import SidebarNavButton from "./SidebarNavButton";
import WidgetFixedHeight from "../BaseWidgets/WidgetFixedHeight";
import GenericSidebar from "./GenericSidebar";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const username = localStorage.getItem('username');
    const avatarURL = localStorage.getItem('avatar');
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchUserProfile() {
            if (!token) return;
            try {
                const response = await fetch('/api/user/profile', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    let roles = data.roles;

                    if (typeof roles === "string") {
                        try {
                            roles = JSON.parse(roles);
                        } catch (e) {
                            console.error("Error parsing roles", e);
                            roles = [];
                        }
                    }

                    setUserRole(roles);
                } else {
                    console.error("Failed to fetch user profile");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }
        fetchUserProfile();
    }, [token]);

    const handleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const accountIcon = faUserCircle || faUser;

    return (
        <>
            <GenericSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen}>
                <NavButton to={'home/'} onClick={() => setIsSidebarOpen(false)}>
                    <InvertableImage reverse={true} src={logo} alt="ATUHub" className="m-auto w-64 max-w-screen-md cursor-pointer" />
                </NavButton>

                <div className="bg-zinc-600 h-px mt-auto rounded-full" />

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

                {userRole && Array.isArray(userRole) && userRole.includes("Administrator") && (
                    <>
                        <div className="bg-zinc-600 h-px mt-auto rounded-full" />

                        <SidebarNavButton
                            to='users'
                            name='Users'
                            icon={faUsers}
                            setIsSidebarOpen={setIsSidebarOpen}
                        />
                    </>
                )}

                <div>
                    <div className="space-y-4 w-full p-4 left-0 absolute bottom-0">
                        <div className="bg-zinc-600 h-px mt-auto rounded-full" />
                        <div className="flex space-x-4">
                            <div className="flex-grow">
                                {avatarURL ? (
                                    <NavButton to='account' onClick={() => setIsSidebarOpen(false)}>
                                        <WidgetFixedHeight height={50}>
                                            <div className="w-full h-full flex flex-row text-lg items-center gap-2">
                                                <img src={avatarURL} alt="Profile Avatar" className="w-8 h-8 rounded-full shadow-lg mx-1" />
                                                <p>{username || 'Profile'}</p>
                                            </div>
                                        </WidgetFixedHeight>
                                    </NavButton>
                                ) : (
                                    <SidebarNavButton
                                        to='account'
                                        icon={accountIcon}
                                        name={username || 'Profile'}
                                        setIsSidebarOpen={setIsSidebarOpen}
                                    />
                                )}
                            </div>
                            <div>
                                <NavButton to={'account/settings'} onClick={() => setIsSidebarOpen(false)}>
                                    <WidgetFixedHeight height={50} className="aspect-square justify-center">
                                        <span className="flex items-center justify-center">
                                            <FontAwesomeIcon icon={faGear} className="text-center" />
                                        </span>
                                    </WidgetFixedHeight>
                                </NavButton>
                            </div>
                        </div>
                    </div>
                </div>
            </GenericSidebar>
            <div className="absolute top-0 right-0 p-7">
                <button onClick={handleMenu}><FontAwesomeIcon icon={faBars} className="invert text-4xl" /></button>
            </div>
        </>
    );
}