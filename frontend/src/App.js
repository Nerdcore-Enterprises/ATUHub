import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import routes from "./routes";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
    const location = useLocation();
    const [validSession, setValidSession] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
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
    }, [location.pathname]);

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