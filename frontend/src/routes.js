import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import WeatherPage from "./pages/WeatherPage";
import JobsPage from "./pages/JobsPage";
import TransportationPage from "./pages/TransportationPage";
import DineOnCampusPage from "./pages/DineOnCampus/index";
import DineOnCampusMenuPage from "./pages/DineOnCampus/menu";
import NotFoundPage from "./pages/not-found";
import PickDriverPage from "./pages/PickDriverPage";
import DriveRequestPage from "./pages/DriverRequest/DriveRequestPage";
import DriveSubmit from "./pages/DriveSubmit/DriveSubmit";
import SettingsPage from "./pages/SettingsPage";

const routes = (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/settings" element={<SettingsPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/transportation" element={<TransportationPage />} />
        <Route path="/transportation/driver" element={<PickDriverPage />} />
        <Route path="/dineoncampus" element={<DineOnCampusPage />} />
        <Route path="/dineoncampus/menu" element={<DineOnCampusMenuPage />} />
        <Route path="/transportation/drive-request" element={<DriveRequestPage />} />
        <Route path="/transportation/drive-submit" element={<DriveSubmit />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export default routes;