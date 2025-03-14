import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import routes from "./routes";
import Sidebar from "./components/Sidebar/Sidebar";
import UserPreferences from "./scripts/UserPreferences";
import useFetchAvatar from './hooks/useFetchAvatar';

export default function App() {
    const location = useLocation();
    const [validSession, setValidSession] = useState(null);

    const token = localStorage.getItem("token");

    useFetchAvatar(token);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');

        if (storedDarkMode !== null) {
            const isDark = storedDarkMode === 'true';
            UserPreferences.setDarkMode(isDark);
            document.documentElement.classList.toggle('dark', isDark);
        }

        if (!token) {
            setValidSession(false);
            return;
        }

        fetch("/api/user/profile", {
            headers: { Authorization: "Bearer " + token }
        })
            .then(response => {
                setValidSession(response.ok);
            })
            .catch(() => {
                setValidSession(false);
            });

        const fetchPreferences = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('/api/user/preferences', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const result = await response.json();

                    localStorage.setItem('darkMode', result.darkMode);
                    UserPreferences.setDarkMode(result.darkMode);
                    document.documentElement.classList.toggle('dark', result.darkMode);
                }
            } catch (error) {
                console.error('Error fetching user preferences', error);
            }
        };

        fetchPreferences();
    }, [location.pathname, token]);

    if (validSession === null) return null;

    if (!validSession && location.pathname !== "/") {
        return <Navigate to="/" replace />;
    }

    if (validSession && location.pathname === "/") {
        return <Navigate to="/home" replace />;
    }

    return (
        <div>
            {routes}
            {location.pathname !== '/' && <Sidebar />}
        </div>
    );
}