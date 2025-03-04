import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import routes from "./routes";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
    const location = useLocation();

    const token = localStorage.getItem("token");

    if (!token && location.pathname !== "/") {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            {routes}
            {location.pathname !== '/' && <Sidebar/>}
        </div>
    );
}