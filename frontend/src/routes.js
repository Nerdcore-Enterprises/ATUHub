import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";
import JobsPage from "./pages/JobsPage";
import TransportationPage from "./pages/TransportationPage.js";
import DineOnCampusPage from "./pages/DineOnCampusPage";

const routes = (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/transportation" element={<TransportationPage />} />
        <Route path="/dineoncampus" element={<DineOnCampusPage />} />
    </Routes>
)

export default routes;