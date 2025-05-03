import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import routes from "./routes";
import Sidebar from "./components/Sidebar/Sidebar";
import UserPreferences from "./scripts/UserPreferences";
import useFetchAvatar from "./hooks/useFetchAvatar";

export default function App() {
    const location = useLocation();
    const [validSession, setValidSession] = useState(null);
    const token = localStorage.getItem("token");

    useFetchAvatar(token);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem("darkMode");
        if (storedDarkMode !== null) {
            const isDark = storedDarkMode === "true";
            UserPreferences.setDarkMode(isDark);
            document.documentElement.classList.toggle("dark", isDark);
        }

        if (!token) {
            setValidSession(false);
            return;
        }

        async function checkSessionAndPreferences() {
            try {
                const profileResponse = await fetch("/api/user/profile", {
                    headers: { Authorization: "Bearer " + token }
                });

                if (profileResponse.ok) {
                    setValidSession(true);

                    const prefResponse = await fetch("/api/user/preferences", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (prefResponse.ok) {
                        const result = await prefResponse.json();
                        localStorage.setItem("darkMode", result.darkMode);
                        UserPreferences.setDarkMode(result.darkMode);
                        document.documentElement.classList.toggle("dark", result.darkMode);
                    }
                } else {
                    setValidSession(false);
                }
            } catch (error) {
                console.error("Error checking session:", error);
                setValidSession(false);
            }
        }

        checkSessionAndPreferences();
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
            {location.pathname !== "/" && <Sidebar />}
        </div>
    );
}