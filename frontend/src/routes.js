import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import WeatherPage from "./pages/WeatherPage";
import JobsPage from "./pages/JobsPage";
import TransportationPage from "./pages/TransportationPage";
import DineOnCampusPage from "./pages/DineOnCampus/index";
import DineOnCampusMenuPage from "./pages/DineOnCampus/menu";
import NotFoundPage from "./pages/not-found";

const routes = (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/transportation" element={<TransportationPage />} />
        <Route path="/dineoncampus" element={<DineOnCampusPage />} />
        <Route path="/dineoncampus/menu" element={<DineOnCampusMenuPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
)

export default routes;